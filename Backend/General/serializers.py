import collections
from django.db.models import fields
from rest_framework import serializers
from CustomUser import models
from CustomUser.models import UserNotificaiton
from rest_framework import  exceptions

from General.models import Review

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.profile_full_name", read_only=True)
    avatar = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Review
        fields = '__all__'  
        
    
    def get_avatar(self, obj:Review):
        if obj.user.profile_exists():
            try:
                return obj.user.profile().avatar.url[1:]
            except:
                return ""
        else:
            return None