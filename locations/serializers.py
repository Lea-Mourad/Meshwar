from rest_framework import serializers
from .models import Location

class LocationSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(required=False)
    
    class Meta:
        model = Location
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
        
    def validate(self, data):
        if not data.get('picture') and not data.get('picture_url'):
            raise serializers.ValidationError("Either picture or picture_url must be provided")
        return data 