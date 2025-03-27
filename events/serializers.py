from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'date', 'location', 'category', 'image', 'ticket_link', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at'] 