from django.shortcuts import render

# Create your views here.

from rest_framework import generics, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from datetime import timedelta
from django.utils import timezone
from .serializers import UserRegistrationSerializer, EmailVerificationSerializer 
from authenticate.models import EmailVerification
from django.conf import settings
import logging


logger = logging.getLogger(__name__)


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def perform_create(self, serializer):
        user = serializer.save()
    
        expires_at = timezone.now() + timedelta(hours=24)
        verification = EmailVerification.objects.create(user=user, expires_at=expires_at)
        
        try:
        send_mail(
            "Test Email from Meshwar",
            "If you received this, please reply!",
            settings.DEFAULT_FROM_EMAIL,
            ["nst11@mail.aub.edu"],
            fail_silently=False,
            )
        logger.info("Email sent successfully.")
        except Exception as e:
            logger.error(f"Email sending failed: {e}")

class EmailVerificationView(generics.GenericAPIView):
    serializer_class = EmailVerificationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        verification = serializer.validated_data
        user = verification.user
        user.is_verified = True
        user.save()
        verification.delete()  # Delete the verification code after use
        return Response({"message": "Email verified successfully!"}, status=status.HTTP_200_OK)