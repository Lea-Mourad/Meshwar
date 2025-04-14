from django.db import models

class Location(models.Model):
    CATEGORY_CHOICES = [
        ('HISTORICAL', 'Historical sites'),
        ('RESTAURANT', 'Restaurants'),
        ('BEACH', 'Beaches'),
        ('COFFEE', 'Coffee shops'),
        ('HOTEL', 'Hotels'),
        ('NIGHTLIFE', 'Night life'),
        ('MUSEUM', 'Museums'),
        ('ACTIVITY', 'Activities'),
    ]
    
    CITY_CHOICES = [
        ('BEIRUT', 'Beirut'),
        ('BAALBAK', 'Baalbak'), 
        ('BATROUN', 'Batroun'),
        ('BYBLOS', 'Byblos'),
        ('SIDON', 'Sidon'),
        ('SOUR', 'Sour'),
    ]
    

    # Required fields
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)  # e.g. "Hamra Street"
    city = models.CharField(max_length=10, choices=CITY_CHOICES)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    # Optional fields
    
    max_people = models.PositiveIntegerField(null = True, blank= True)
    current_people = models.PositiveIntegerField(default=0, null = True, blank=True)
    location = models.CharField(max_length=100, null=True)  # Google Maps link or coordinates
    cost_range = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    ticket_link = models.URLField(blank=True, null=True)
    
    # Automatic fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_city_display()})"