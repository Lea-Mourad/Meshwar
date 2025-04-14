from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import hello_world, LocationViewSet

router = DefaultRouter()
router.register(r'locations', LocationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('hello/', hello_world, name='hello_world'),
]