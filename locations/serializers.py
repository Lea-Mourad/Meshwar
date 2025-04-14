from rest_framework import serializers
from .models import Location

class LocationSerializer(serializers.ModelSerializer):
    city_display = serializers.CharField(source='get_city_display', read_only=True)
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Location
        fields = [
            'id', 'name', 'address', 'location', 'city', 'city_display',
            'category', 'category_display', 'max_people', 'current_people',
            'cost_range', 'description', 'image_url', 'ticket_link',
            'created_at'
        ]