from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

from CustomUser.models import UserProfile

class AttributeItem(models.Model):
    title = models.TextField(blank=True)
    coverImage = models.ForeignKey(
        "General.MediaFile", on_delete=models.CASCADE, null=True, blank=True
    )


class Attribute(models.Model):
    title = models.TextField(blank=True)
    items = models.ManyToManyField(AttributeItem, blank=True)


class VariantItem(models.Model):
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, null=True)
    attributeItem = models.ForeignKey(AttributeItem, on_delete=models.CASCADE, null=True)


class Variant(models.Model):
    price = models.FloatField(null=True, blank=True)
    items = models.ManyToManyField(VariantItem, blank=True)

class Product(models.Model):
    title = models.TextField(blank=True)
    description = models.TextField(null=True, blank=True)
    isFeatured = models.BooleanField(default=False)
    status = models.BooleanField(default=False)
    isDeliverable = models.BooleanField(default=False)
    price = models.FloatField(null=True, blank=True)
    slug = models.SlugField(null=True, unique=True)
    avgRating = models.IntegerField(default=0)

    store = models.ForeignKey(
        UserProfile, null=True, blank=True, on_delete=models.CASCADE
    )

    createdAt = models.DateField(auto_now=True)
    updatedAt = models.DateField(null=True, blank=True)

    coverImage = models.ForeignKey(
        "General.MediaFile",
        related_name=("item_cover_image"),
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    variant=models.ManyToManyField(Variant,blank=True)
    gallery = models.ManyToManyField(
        "General.MediaFile", verbose_name=("item_gallery_images"), blank=True
    )

    # diets = models.ManyToManyField(Diet, blank=True)
    # foodTypes = models.ManyToManyField(FoodType, blank=True)

    def save(self, *args, **kwargs):

        self.updated_at = datetime.now()
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class Category(models.Model):
    title = models.TextField(blank=True)
    description = models.TextField(null=True, blank=True)
    isFeatured = models.BooleanField(default=False)
    status = models.BooleanField(default=False)
    slug = models.SlugField(null=True, blank=True)
    
    items=models.ManyToManyField(Product)

    coverImage = models.ImageField(
        null=True,
        blank=True,
    )

    createdAt = models.DateField(auto_now=True)
    updatedAt = models.DateField(null=True, blank=True)

    isParent = models.BooleanField(default=False)
    parentId = models.ForeignKey(
        "self",
        verbose_name=("item_category_item_category_relation"),
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        self.updated_at = datetime.now()
        return super().save(*args, **kwargs)

class StoreCategory(models.Model):
    store= models.ForeignKey(UserProfile,on_delete=models.CASCADE)
    categories=models.ManyToManyField(Category)
