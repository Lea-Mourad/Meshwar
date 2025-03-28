from django.urls import path
from .views import (
    UserRegistrationView,
    EmailVerificationView,
    LoginView,
    LogoutView,
    AdminLoginView,
    add_favorite,
    remove_favorite,
    list_favorite,
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-email/', EmailVerificationView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),

    # Favorites
    path('favorites/add/', add_favorite, name='add_favorite'),
    path('favorites/remove/', remove_favorite, name='remove_favorite'),
    path('favorites/list/', list_favorite, name='list_favorites'),
]
