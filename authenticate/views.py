from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from datetime import timedelta
from django.utils import timezone
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer, EmailVerificationSerializer,LoginSerializer
from authenticate.models import EmailVerification
from .utils import send_email
import logging
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Favorite, Place
from django.http import JsonResponse 

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


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Requires JWT authentication
def add_favorite(request):
    try:
        data = request.data  # DRF uses request.data instead of request.body
        place_id = data.get('place_id')

        print(f"Received place_id: {place_id}")  # Debugging

        # Check if the place exists
        place = Place.objects.get(id=place_id)
        print(f"Found place: {place.name}")  # Debugging

        # Check the authenticated user
        print(f"Authenticated user: {request.user}")  # Debugging

        # Create or get the favorite record
        favorite, created = Favorite.objects.get_or_create(user=request.user, place=place)
        print(f"Favorite created: {created}")  # Debugging

        if created:
            return Response({'message': 'Place added to favorites!'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Place is already in favorites'}, status=status.HTTP_200_OK)

    except Place.DoesNotExist:
        return Response({"error": "Place not found"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        print(f"Unexpected error: {str(e)}")  # Debugging
        return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_favorite(request):
    place_id = request.data.get('place_id')

    if not place_id:
        return Response({"error": "place_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        place = Place.objects.get(id=place_id)
    except Place.DoesNotExist:
        return Response({"error": "Place not found"}, status=status.HTTP_404_NOT_FOUND)

    # Check if the place is already in favorites
    favorite = Favorite.objects.filter(user=request.user, place=place).first()

    if favorite:
        favorite.delete()
        return Response({'message': 'Place removed from favorites'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Place not in favorites'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_favorite(request):
    city = request.GET.get('city')
    
    # Get the user's favorite places
    favorites = Favorite.objects.filter(user=request.user).select_related('place')

    if city:
        favorites = favorites.filter(place__city__iexact=city)

    favorite_places = [
        {
            'id': fav.place.id,
            'name': fav.place.name,
            'description': fav.place.description,
            'image': request.build_absolute_uri(fav.place.image.url) if fav.place.image else None,
            'city': fav.place.city,
        }
        for fav in favorites
    ]

    return Response({'favorites': favorite_places}, status=status.HTTP_200_OK)
