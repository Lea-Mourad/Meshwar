from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import EmailVerification, User
import uuid
from datetime import timedelta
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate
from .models import PasswordResetToken
from django.core.mail import send_mail


User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

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



class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("No user with this email found.")

        # Check if the user's email is verified
        if not user.is_verified:
            raise serializers.ValidationError("Email is not verified. Please verify your email first.")

        # Proceed with generating the reset token
        reset_token = PasswordResetToken.objects.create(user=user)

        reset_link = f"http://localhost:3000/reset-password/{reset_token.token}/"
        send_mail(
            subject="Password Reset Request",
            message=f"Click the link below to reset your password:\n\n{reset_link}",
            from_email="nst11@mail.aub.edu",
            recipient_list=[user.email],
            fail_silently=False,
        )

        return value
    
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