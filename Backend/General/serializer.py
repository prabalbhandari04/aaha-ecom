from django.db import models
from django.db.models import fields
from rest_framework import serializers

from General.models import MediaFile

class ImageSerializer(serializers.ModelSerializer):
    url=  serializers.SerializerMethodField()
    class Meta:
        model=MediaFile
        fields=['url']
    def get_url(self, obj: MediaFile):
        if obj.file != None:
            return obj.file.url
        else:
            return None 

class GallerySerializer(serializers.ModelSerializer):
    url=  serializers.SerializerMethodField()
    class Meta:
        model=MediaFile
        fields=['url']
    def get_url(self, obj: MediaFile):
        if obj.file != None:
            return obj.file.url
        else:
            return None  
    