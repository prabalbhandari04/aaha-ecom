from enum import Enum
from django.db import models

class NumOrString(Enum):
    percent=1
    value=2

class Tax(models.Model):
    type=models.IntegerField(choices=((_.value, _.name) for _ in NumOrString),default=1)
    amount=models.FloatField(default=13)

class appSettings(models.Model):
    appName=models.TextField(null=True,blank=True)
    shortDescription=models.TextField(null=True,blank=True)
    image=models.ImageField(upload_to='system/')
    terms=models.TextField(null=True,blank=True) 
    privacy=models.TextField(null=True,blank=True) 
    aboutUs=models.TextField(null=True,blank=True)
    versionNumber=models.TextField(null=True,blank=True)
    facebook=models.TextField(null=True,blank=True)
    instagram=models.TextField(null=True,blank=True)
    github=models.TextField(null=True,blank=True)

class MaintainanceMode(models.Model):
    status=models.BooleanField(default=True)
    message=models.TextField(null=True,blank=True,default="MaintainanceMode")

