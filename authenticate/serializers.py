from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import EmailVerification, User
import uuid
from datetime import timedelta
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate
import logging
logger = logging.getLogger(__name__)

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
            verification = EmailVerification.objects.get(code=value)  # ✅ Correct field name
            
            if verification.expires_at < timezone.now():  # ✅ Expiration check
                raise serializers.ValidationError("Verification code has expired.")

            return verification  # ✅ Return the verification object

        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("Invalid verification code.")

