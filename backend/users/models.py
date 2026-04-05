from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Overriding the default email field to make it mandatory and unique
    email = models.EmailField(unique=True)

    # Use email to log in instead of the default username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email