from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Location
from .serializers import LocationSerializer

# Create your views here.

class LocationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing tourism locations.
    All operations are allowed without authentication.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'city']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'cost', 'max_people', 'created_at']
    ordering = ['-created_at']
