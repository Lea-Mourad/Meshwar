from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Location
from .serializers import LocationSerializer
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly  # Allows read access to everyone

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [AllowAny]  # Adjust as needed
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # For filtering
    filterset_fields = {
        'city': ['exact'],
        'category': ['exact'],
        'max_people': ['gte', 'lte'],
        'cost_range': ['gte', 'lte'],
    }
    
    # For search functionality
    search_fields = ['name', 'address', 'description']
    
    # For ordering
    ordering_fields = ['name', 'current_people', 'cost_range', 'created_at']
    ordering = ['-created_at']  # Default ordering
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Get query parameters
        city = self.request.query_params.get('city', None)
        category = self.request.query_params.get('category', None)
        max_people = self.request.query_params.get('max_people', None)
        
        # Apply filters if they exist
        if city:
            queryset = queryset.filter(city=city)
        if category:
            queryset = queryset.filter(category=category)
        if max_people:
            queryset = queryset.filter(max_people__lte=max_people)
            
        return queryset