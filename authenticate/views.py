from django.shortcuts import render

# Create your views here.

from rest_framework import generics, status
from rest_framework.response import Response
from datetime import timedelta
from django.utils import timezone
from .serializers import UserRegistrationSerializer, EmailVerificationSerializer,LoginSerializer
from authenticate.models import EmailVerification
from .utils import send_email
import logging
from rest_framework_simplejwt.tokens import RefreshToken



logger = logging.getLogger(__name__)

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def perform_create(self, serializer):
        user = serializer.save()
    
        expires_at = timezone.now() + timedelta(hours=24)
        verification = EmailVerification.objects.create(user=user, expires_at=expires_at)
        
        try:
            # Send email using Postmark
            subject = "Verify Your Email for Meshwar"
            message = f"Your verification code is: {verification.code}"
            to_email = user.email
            send_email(subject, message, to_email)
            logger.info("Email sent successfully.")
        except Exception as e:
            logger.error(f"Email sending failed: {e}")



class EmailVerificationView(generics.GenericAPIView):
    serializer_class = EmailVerificationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Access the verification object from the serializer context
        verification = serializer.verification
        user = verification.user
        user.is_verified = True
        user.save()
        verification.delete()  # Delete the verification code after use
        return Response({"message": "Email verified successfully!"}, status=status.HTTP_200_OK)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful!",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_200_OK)