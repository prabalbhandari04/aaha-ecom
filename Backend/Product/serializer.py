import re
from django.db import models
from django.db.models import fields
from rest_framework import serializers
from CustomUser.models import StoreDetail
from General.serializer import GallerySerializer
from rest_framework import exceptions
from Product.models import Product, Variant

class ProductSerializer(serializers.ModelSerializer):
    coverImage=serializers.SerializerMethodField()
    class Meta:
        model=Product
        fields=[
            "title",
            "price",
            "slug",
            "coverImage"
            ]
    def get_coverImage(self,obj:Product):
        if obj.coverImage:
            return obj.coverImage.file.url
        else:
            return None


class ProductDetailSerializer(serializers.ModelSerializer):
    coverImage=serializers.SerializerMethodField()
    gallery=serializers.SerializerMethodField()
    variant=serializers.SerializerMethodField()

    class Meta:
        model=Product
        fields=["id",
            "title",
            "description",
            "price",
            "slug",
            "coverImage",
            "gallery",
            "avgRating",
            "variant"]

    def get_coverImage(self,obj:Product):
        if obj.coverImage:
            return obj.coverImage.file.url
        else:
            return None
    def get_gallery(self,obj:Product):
        # for _ in GallerySerializer(obj.gallery,many=True).data:
        #     print(_)
        #     return _
        return [_['url'] for _ in GallerySerializer(obj.gallery,many=True).data]
    def get_variant(self,obj:Product):
        variants=obj.variant.all()
        starting=0
        temp=[]

        if variants:
            temp.append(variants[0])

            for _ in variants:
                if starting==0:
                    starting=_.price
                elif _.price<starting:
                    starting=_.price
                    
                    temp[0]=_
        
        if len(temp)!=0:
            id=temp[0].id
            variant_instance=Variant.objects.filter(id=id).first()
            if not variant_instance:
                raise exceptions.NotFound("Variant Invalid.")
            var_attributes=variant_instance.items.all()
            attributes={}
            for _ in var_attributes:
                attributes[_.attribute.id]=_.attributeItem.id
            return ({"id":id,"startingPrice":starting,"attribute":attributes})
        else:
            return None

class  StoreSerializer(serializers.ModelSerializer):

    class Meta:
        model=StoreDetail
        # fields='__all__'
        fields=['id','storeName','avatar','rating','store','slug']
    