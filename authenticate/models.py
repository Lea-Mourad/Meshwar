from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser , BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None  # Remove the username field
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'  # Use email as the username field
    REQUIRED_FIELDS = []  # No additional required fields

    objects = UserManager()

    def __str__(self):
        return self.email

class EmailVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_expired(self):
        return timezone.now() > self.expires_at
