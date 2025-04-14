from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from locations.models import Location
from locations.serializers import LocationSerializer

def hello_world(request):
    return JsonResponse({"message": "Hello, World!"})
