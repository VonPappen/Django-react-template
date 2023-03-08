from email import message
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


class TestModel(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField(max_length=1000, blank=False)
