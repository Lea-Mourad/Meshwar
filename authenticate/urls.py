from django.urls import path
from .views import UserRegistrationView, EmailVerificationView, LoginView, LogoutView, AdminLoginView
from .views import add_favorite,remove_favorite, list_favorite
from django.conf import settings

from .models import Place, Favorite
from django.conf.urls.static import static
urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-email/', EmailVerificationView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),
  path('favorites/add/', add_favorite, name='add_favorite'),  
    path('favorites/remove/', remove_favorite, name='remove_favorite'),
    path('favorites/list/', list_favorite, name='list_favorites'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)