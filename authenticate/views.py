import uuid
from django.shortcuts import render

# Create your views here.

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer, EmailVerificationSerializer,LoginSerializer,ChangeEmailSerializer,VerifyEmailChangeSerializer, PasswordResetConfirmSerializer, PasswordResetRequestSerializer
from authenticate.models import EmailVerification
from .utils import send_email
import logging
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache
from uuid import uuid4
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import serializers



logger = logging.getLogger(__name__)

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User registered successfully.',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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



class ChangeEmailView(generics.GenericAPIView):
    serializer_class = ChangeEmailSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        user = request.user  # Get the logged-in user
        # Serialize incoming data to validate the new email
        serializer = self.get_serializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            new_email = serializer.validated_data['new_email']
            # Store the new email in the cache with an expiration time (24 hours)
            cache.set(f'new_email_{user.id}', new_email, timeout=86400)  # Cache for 24 hours
            # Generate and send a verification code to the new email
            expires_at = timezone.now() + timedelta(hours=24)
            verification = EmailVerification.objects.create(
                user=user, 
                code=uuid.uuid4(), 
                expires_at=expires_at
            )
            # Send email with verification code
            subject = "Verify Your New Email for Meshwar"
            message = f"Your verification code is: {verification.code}"
            to_email = new_email
            send_email(subject, message, to_email)
            logger.info(f"Stored verification code: {verification.code}")
            return Response({
                "message": "A verification code has been sent to your new email address. Please verify it to complete the change."
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class VerifyEmailChangeView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VerifyEmailChangeSerializer
    def patch(self, request,*args, **kwargs):
        serializer = VerifyEmailChangeSerializer(data=request.data)
    
        if serializer.is_valid():
            verification = serializer.validated_data["verification_code"]  
            logger.info(f"Entered verification code: {verification}")
            user = request.user
            new_email = cache.get(f'new_email_{user.id}')
            if not new_email:
                return Response({"error": "No new email stored, or it has expired."}, status=status.HTTP_400_BAD_REQUEST)
            # Update user email
            user.email = new_email
            user.is_verified = True
            user.save()
            # Delete verification record and cache
            verification.delete()  
            cache.delete(f'new_email_{user.id}')
            return Response({"message": "Email updated successfully.", "email": user.email}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#api to fetch the old current email
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user = request.user
        data = {
            'id': user.id,
            'email': user.email,
            # You can add more user fields here if needed.
        }
        return Response(data, status=200)
    
class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        # The logged-in user is already authenticated and available as request.user
        user = request.user
        # Delete the logged-in user account
        user.delete()
        
        return Response({"detail": "User account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        logger.debug(f"Received password reset request with data: {request.data}")
        try:
            logger.debug("Initializing serializer")
            serializer = self.get_serializer(data=request.data)
            
            logger.debug("Validating serializer data")
            serializer.is_valid(raise_exception=True)
            
            logger.info("Password reset email sent successfully")
            return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:
            logger.error(f"Validation error in password reset request: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error in password reset request: {str(e)}", exc_info=True)
            raise


class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)

class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        if not request.user.is_staff:
            return Response({"detail": "Only staff members can access this endpoint."}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        users = User.objects.all()
        data = [{
            'id': user.id,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_active': user.is_active,
            'is_verified': user.is_verified,
            'date_joined': user.date_joined
        } for user in users]
        return Response(data)

class UserCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        if not request.user.is_staff:
            return Response({"detail": "Only staff members can create users."}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User created successfully.',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'is_staff': user.is_staff,
                    'is_active': user.is_active,
                    'is_verified': user.is_verified
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, user_id):
        if not request.user.is_staff:
            return Response({"detail": "Only staff members can delete users."}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        try:
            user = User.objects.get(id=user_id)
            if user == request.user:
                return Response({"detail": "You cannot delete your own account."}, 
                              status=status.HTTP_400_BAD_REQUEST)
            user.delete()
            return Response({"detail": "User deleted successfully."}, 
                          status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, 
                          status=status.HTTP_404_NOT_FOUND)
