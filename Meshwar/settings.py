"""
Django settings for Meshwar project.

Generated by 'django-admin startproject' using Django 5.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
import os
from urllib.parse import urlparse



# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-=nk2hm3sss=ky*j(p+_pw&_bm6y98+f0*!oja!-7_j2=ogrht^"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "drf_yasg", # Swagger testing tool
    'rest_framework', #Django rest framework
    'rest_framework_simplejwt', # tokenization framework for login api
    'rest_framework_simplejwt.token_blacklist', # for logout purposes

    "api",  #testing api
    "authenticate", #Authentication and user related api
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "Meshwar.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "Meshwar.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://meshwar_user:LIIOTK7o0bSLI02vUETrEmW05OZWWwei@dpg-cuhktkbtq21c73bbltj0-a.frankfurt-postgres.render.com/meshwar"
)

db_info = urlparse(DATABASE_URL)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': db_info.path[1:], 
        'USER': db_info.username,
        'PASSWORD': db_info.password,
        'HOST': db_info.hostname,
        'PORT': db_info.port or 5432,  
    }
}

# Depreacted:
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.sqlite3',
#             'NAME': BASE_DIR / 'db.sqlite3',
#         }
#     }


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# User model is at authenticate
AUTH_USER_MODEL = 'authenticate.User'


# Verification email related settings, deprecated, we will be using postman API for now
    # EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    # EMAIL_HOST = "smtp.postmarkapp.com"
    # EMAIL_PORT = 587
    # EMAIL_USE_TLS = True
    # EMAIL_HOST_USER = "810dd24e-bb2f-47de-b880-f7ef125bb525" 
    # EMAIL_HOST_PASSWORD = "810dd24e-bb2f-47de-b880-f7ef125bb525" 
    # DEFAULT_FROM_EMAIL = "ln_tebbal@esi.dz" 

# Postman API settings 
POSTMARK_API_KEY = '810dd24e-bb2f-47de-b880-f7ef125bb525'
DEFAULT_FROM_EMAIL = 'nst11@mail.aub.edu'


#Tokenization settings
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Access token validity
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),     # Refresh token validity
    'ROTATE_REFRESH_TOKENS': True,                  # Rotate refresh tokens
    'BLACKLIST_AFTER_ROTATION': True,               # Blacklist old refresh tokens
}