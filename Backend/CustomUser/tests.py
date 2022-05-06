from django.contrib.auth.models import User
from django.http import response
from django.test import TestCase
from django.test import client
from django.test.client import Client
from django.urls import reverse
from .models import UserProfile, Profile, StoreDetail
import json


class TestViews(TestCase):
    def setUp(self):
        self.client = Client()

    def test_register(self):
        register_url = reverse("user-register")
        response = self.client.post(
            register_url,{
                "username": 213213,
                "fname": "mememe",
                "password": "ihdsfahdvf",
                "lname": "eheheheh",
                })
        self.assertEquals(response.status_code, 200)

    def test_login(self):
        login_url=reverse('login')
        user=UserProfile.objects.create(email='test@email.com',username='213213')
        user.set_password('ihdsfahdvf')
        user.save()

        
        response = self.client.post(
            login_url,{
                'phone':"213213",
                "password": "ihdsfahdvf",
                })
        self.assertEquals(response.status_code, 200)
