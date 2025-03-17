from django.urls import path
from .views import UserRegistrationView, EmailVerificationView, LoginView, LogoutView, AdminLoginView, ChangeEmailView,DeleteAccountView ,VerifyEmailChangeView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-email/', EmailVerificationView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('change-email/', ChangeEmailView.as_view(), name='change-email'),   
    path("verify-email-change/", VerifyEmailChangeView.as_view(),name='verify-email-change'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),

]