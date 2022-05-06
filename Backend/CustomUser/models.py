from django.db import models
from django.contrib.auth import validators
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django.template.defaultfilters import slugify

from rest_framework import serializers

from General.models import MediaFile

# from General.models import City, Country, State
from . import manager as user_manager
from django.conf import settings


class Profile(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="user",
        on_delete=models.CASCADE,
        null=True,
    )
    fname = models.CharField(max_length=24, null=True)
    lname = models.CharField(max_length=24, null=True)
    date = models.DateField(max_length=24, null=True)
    avatar = models.ImageField(upload_to="avatar/", null=True)


class UserProfile(AbstractUser):
    email = models.EmailField(("email address"), unique=True, null=True)
    username = models.IntegerField(unique=True, null=True)
    is_store=models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"

    objects = user_manager.UserProfileManager()

        
    def __str__(self):
        return str(self.username)

    def profile_exists(self):
        return Profile.objects.filter(user_id=self.pk).exists()

    def profile(self) -> Profile:
        if self.profile_exists():
            return Profile.objects.get(user_id=self.pk) or None

    def profile_full_name(self) -> str:
        if self.profile_exists():
            return self.profile().fname + " " + self.profile().lname

class StoreDetail(models.Model):
    store=models.ForeignKey(UserProfile,on_delete=models.CASCADE,null=True,blank=True)
    
    avatar = models.ImageField(upload_to="avatar/", null=True)
    coverImage=models.ImageField(upload_to="avatar/", null=True)
    slug = models.SlugField(null=True, unique=True)
    
    storeName=models.CharField(null=True,blank=True,max_length=32)
    rating=models.IntegerField(default=0)
    
    def save(self, *args, **kwargs):

        self.updated_at = datetime.now()
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

