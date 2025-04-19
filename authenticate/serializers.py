from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import EmailVerification, User, PasswordResetToken
import uuid
from datetime import timedelta
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
import logging
from postmarker.core import PostmarkClient
from .utils import send_email


User = get_user_model()
logger = logging.getLogger(__name__)

# Initialize Postmark client
postmark = PostmarkClient(server_token=settings.POSTMARK['TOKEN'])

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_staff = serializers.BooleanField(required=False, default=False)
    is_active = serializers.BooleanField(required=False, default=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'is_staff', 'is_active']

    def create(self, validated_data):
        try:
            user = User.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password'],
                is_staff=validated_data.get('is_staff', False),
                is_active=validated_data.get('is_active', True)
            )
            return user
        except Exception as e:
            logger.error(f"Error creating user: {str(e)}")
            raise serializers.ValidationError(f"Error creating user: {str(e)}")

class EmailVerificationSerializer(serializers.Serializer):
    code = serializers.UUIDField()

    def validate_code(self, value):
        try:
            verification = EmailVerification.objects.get(code=value)
            if verification.is_expired():
                raise serializers.ValidationError("Verification code has expired.")
            # Store the verification object in the serializer context
            self.verification = verification
            return value  # Return the code itself
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("Invalid verification code.")


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        if email and password:
            # Authenticate the user
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError(_("Unable to log in with provided credentials."))
            if not user.is_verified:
                raise serializers.ValidationError(_("Email is not verified. Please verify your email first."))
        else:
            raise serializers.ValidationError(_("Must include 'email' and 'password'."))

        data['user'] = user
        return data

  
class ChangeEmailSerializer(serializers.ModelSerializer):
    new_email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ['new_email']
    def validate_new_email(self, value):
        # Get the current user from the request context
        user = self.context['request'].user
        current_email = user.email
        # Check if the new email is different from the current email
        if value == current_email:
            raise serializers.ValidationError("You cannot update to your current email.")
        
        # Check if the new email is already in use by another user
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already taken.")
        
        return value
    
class VerifyEmailChangeSerializer(serializers.Serializer):
    verification_code = serializers.UUIDField(required=True)
    def validate_verification_code(self, value):
        try:
            verification = EmailVerification.objects.get(code=value)  
            
            if verification.expires_at < timezone.now(): 
                raise serializers.ValidationError("Verification code has expired.")
            return verification 
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("Invalid verification code.")
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        logger.info(f"Starting password reset request for email: {value}")
        try:
            user = User.objects.get(email=value)
            logger.info(f"User found: {user.email}")
        except User.DoesNotExist:
            logger.info(f"No user found with email: {value}")
            # Don't reveal that the email doesn't exist for security reasons
            return value

        # Check if the user's email is verified
        if not user.is_verified:
            logger.warning(f"User {user.email} is not verified")
            raise serializers.ValidationError("Email is not verified. Please verify your email first.")

        try:
            # Create a new reset token
            logger.info("Creating reset token")
            try:
                reset_token = PasswordResetToken.objects.create(user=user)
                logger.info(f"Reset token created: {reset_token.token}")
            except Exception as token_error:
                logger.error(f"Failed to create reset token: {str(token_error)}", exc_info=True)
                raise serializers.ValidationError(f"Failed to create reset token: {str(token_error)}")
            
            # Generate reset link
            reset_link = f"http://localhost:5173/reset-password/{reset_token.token}/"
            logger.info(f"Generated reset link: {reset_link}")
            
            # Prepare email content
            subject = "Password Reset Request - Meshwar"
            html_message = f"""
            <html>
                <body>
                    <h2>Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>You requested a password reset for your Meshwar account.</p>
                    <p>Click the button below to reset your password:</p>
                    <p>
                        <a href="{reset_link}" style="background-color: #B24F4F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            Reset Password
                        </a>
                    </p>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                    <p>Best regards,<br>Meshwar Team</p>
                </body>
            </html>
            """
            
            # Send email using the utility function
            logger.info(f"Attempting to send email to {user.email}")
            try:
                logger.info("Initializing email sending process")
                send_email(subject, html_message, user.email)
                logger.info("Email sent successfully")
            except Exception as email_error:
                logger.error(f"Email sending failed: {str(email_error)}", exc_info=True)
                if "Postmark" in str(email_error):
                    raise serializers.ValidationError("Unable to send email. Please check your email service configuration.")
                elif "Connection" in str(email_error):
                    raise serializers.ValidationError("Unable to connect to email service. Please try again later.")
                else:
                    raise serializers.ValidationError(f"Email sending failed: {str(email_error)}")
            
            return value
            
        except serializers.ValidationError:
            raise
        except Exception as e:
            logger.error(f"Error in password reset process: {str(e)}", exc_info=True)
            raise serializers.ValidationError(f"An error occurred: {str(e)}")
    
class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.UUIDField()
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            reset_token = PasswordResetToken.objects.get(token=data["token"])
            if reset_token.is_expired():
                raise serializers.ValidationError("Reset token has expired.")
        except PasswordResetToken.DoesNotExist:
            raise serializers.ValidationError("Invalid reset token.")

        self.user = reset_token.user
        reset_token.delete()  # Delete token after successful validation
        return data

    def save(self):
        self.user.set_password(self.validated_data["new_password"])
        self.user.save() 
