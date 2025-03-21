from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event
from .serializers import EventSerializer

# Create your views here.

class EventViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing events.
    All operations are allowed without authentication.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'location']
    search_fields = ['name', 'description']
    ordering_fields = ['date', 'name', 'created_at']
    ordering = ['-date']  # Default ordering
