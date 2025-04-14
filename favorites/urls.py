from django.urls import path
from . import views

app_name = 'favorites'

urlpatterns = [
    path('', views.FavoriteListView.as_view(), name='favorite-list'),
    path('add/<int:location_id>/', views.add_to_favorites, name='add-favorite'),
    path('remove/<int:location_id>/', views.remove_from_favorites, name='remove-favorite'),
] 