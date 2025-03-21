from django.db import models

# Create your models here.

class Event(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    location = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    image = models.URLField()
    ticket_link = models.URLField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']  # Order by date descending

    def __str__(self):
        return f"{self.name} - {self.date}"
