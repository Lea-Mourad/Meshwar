from django.urls import path
from .views import (
    UserRegistrationView, EmailVerificationView, LoginView, LogoutView, 
    AdminLoginView, ChangeEmailView, VerifyEmailChangeView, CurrentUserView,
    DeleteAccountView, PasswordResetConfirmView, PasswordResetRequestView,
    UserListView, UserCreateView, UserDeleteView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-email/', EmailVerificationView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),
    path('change-email/', ChangeEmailView.as_view(), name='change-email'),   
    path('verify-email-change/', VerifyEmailChangeView.as_view(), name='verify-email-change'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    # Admin user management endpoints
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/create/', UserCreateView.as_view(), name='user-create'),
    path('users/<int:user_id>/delete/', UserDeleteView.as_view(), name='user-delete'),
]
