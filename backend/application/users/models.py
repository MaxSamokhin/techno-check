from django.contrib.auth.models import AbstractUser

from django.db import models


class User(AbstractUser):
    test_user = models.BooleanField(default=False)
