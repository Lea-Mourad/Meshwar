from rest_framework import serializers
from .models import Favorite
from locations.serializers import LocationSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'location', 'created_at']
        read_only_fields = ['user'] 