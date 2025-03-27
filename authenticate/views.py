import uuid
from django.shortcuts import render

# Create your views here.

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer, EmailVerificationSerializer,LoginSerializer,ChangeEmailSerializer
from authenticate.models import EmailVerification
from .utils import send_email
import logging
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from uuid import uuid4
from django.core.cache import cache


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


# Logout view
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the refresh token
            return Response({"message": "Logout successful!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Example of using authenticated permission to protect access, useful later on
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected view!"})


# Admin login view
class AdminLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)
        if user and user.is_staff:  # Check if the user is an admin
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class ChangeEmailView(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user  # Get the logged-in user
        serializer = ChangeEmailSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            new_email = serializer.validated_data['new_email']

            # Store the new email in the cache with an expiration time (e.g., 24 hours)
            cache.set(f'new_email_{user.id}', new_email, timeout=86400)  # Cache for 24 hours
            # Generate and send verification code logic here
            expires_at = timezone.now() + timedelta(hours=24)
            verification = EmailVerification.objects.create(
                user=user, 
                code=uuid.uuid4(), 
                expires_at=expires_at
            )
            subject = "Verify Your New Email for Meshwar"
            message = f"Your verification code is: {verification.code}"
            to_email = new_email
            send_email(subject, message, to_email)

            return Response({
                "message": "A verification code has been sent to your new email address. Please verify it to complete the change."
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VerifyEmailChangeView(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        user = request.user  # Get the logged-in user
        verification_code_entered = request.data.get("verification_code")  # Get the code from request

        # Get the most recent, valid verification code for the user
        stored_verification = EmailVerification.objects.filter(
            user=user,
            expires_at__gt=timezone.now()
        ).order_by('-created_at').first()

        if not stored_verification:
            return Response({"error": "No verification record found."}, status=status.HTTP_400_BAD_REQUEST)

        # Log the stored and entered verification codes
        logger.info(f"Stored verification code: {stored_verification.code}")
        logger.info(f"Entered verification code: {verification_code_entered}")

        # Check if verification codes match
        if str(stored_verification.code) != str(verification_code_entered):
            return Response({"error": "Invalid verification code."}, status=status.HTTP_400_BAD_REQUEST)
        # Check if the verification code has expired
        if stored_verification.expires_at < timezone.now():
            return Response({"error": "Verification code has expired."}, status=status.HTTP_400_BAD_REQUEST)
        # Retrieve the temporarily stored new email from the cache
        new_email = cache.get(f'new_email_{user.id}')
        if not new_email:
            return Response({"error": "No new email stored, or it has expired."}, status=status.HTTP_400_BAD_REQUEST)
        # Update the user's email
        user.email = new_email
        user.is_verified = True  # Set email as verified
        user.save()
        # Delete the verification record and cache key since they're no longer needed
        stored_verification.delete()
        cache.delete(f'new_email_{user.id}')  # Clear the cached email

        return Response({"message": "Email updated successfully", "email": user.email}, status=status.HTTP_200_OK)

#i want function for users to delete their Account
class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        # The logged-in user is already authenticated and available as request.user
        user = request.user

        # Delete the logged-in user account
        user.delete()
        
        return Response({"detail": "User account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)