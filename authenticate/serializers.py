from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import EmailVerification, User
import uuid
from datetime import timedelta
from django.utils import timezone


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
            return verification
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("Invalid verification code.")