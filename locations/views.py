from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Location
from .serializers import LocationSerializer

# Create your views here.
# ./venv/Scripts/activate

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [AllowAny]  # Allow public access for all operations
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'city']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'cost', 'max_people', 'created_at']
    ordering = ['-created_at']
