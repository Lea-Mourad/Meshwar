from django.db import models
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

class Location(models.Model):
    CATEGORY_CHOICES = [
        ('HISTORICAL', 'Historical sites'),
        ('RESTAURANTS', 'Restaurants'),
        ('BEACHES', 'Beaches'),
        ('COFFEE_SHOPS', 'Coffee shops'),
        ('HOTELS', 'Hotels'),
        ('NIGHTLIFE', 'Night life'),
        ('MUSEUMS', 'Museums'),
        ('ACTIVITIES', 'Activities'),
    ]

    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    max_people = models.IntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    picture = models.ImageField(upload_to='locations/', null=True, blank=True)
    picture_url = models.URLField(max_length=500, null=True, blank=True, validators=[URLValidator()])
    url = models.URLField(max_length=500, null=True, blank=True, validators=[URLValidator()])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if not self.picture and not self.picture_url:
            raise ValidationError("Either picture or picture_url must be provided")

    def __str__(self):
        return f"{self.name} - {self.city}"

    class Meta:
        ordering = ['-created_at']
