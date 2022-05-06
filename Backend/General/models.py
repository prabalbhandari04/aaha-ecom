from django.db import models
from datetime import datetime
from django.db.models import Avg


class MediaFile(models.Model):
    title=models.TextField(null=True,blank=True)
    file=models.FileField(null=True,blank=True)
    created_at=models.DateField(null=True,blank=True,auto_now=True)
    updated_at=models.DateField(null=True,blank=True)

    def save(self,*args, **kwargs):
        self.updated_at=datetime.now()
        return super().save(*args, **kwargs)

class Review(models.Model):
    title= models.TextField(blank=True)
    rate= models.IntegerField(blank=True,null=True)
    description= models.TextField(null=True,blank=True)
    isFeatured=models.BooleanField(default=False)

    user=models.ForeignKey("CustomUser.UserProfile",  verbose_name=("review_user_relation"), on_delete=models.CASCADE)

    
    food=models.ForeignKey('Product.Product',  verbose_name=("review_food_relation"), on_delete=models.CASCADE)

    created_at=models.DateField(null=True,blank=True,auto_now=True)
    updated_at=models.DateField(null=True,blank=True)

    def save(self,*args, **kwargs):
        avg=Review.objects.aggregate(Avg('rate'))
        item_obj=self.food
        if avg['rate__avg'] is None:
            item_obj.avgRating=self.rate
        else:
            item_obj.avgRating=(avg['rate__avg']+self.rate)/(1+len(Review.objects.all()))
        item_obj.save()
        self.updated_at=datetime.now().date()
        return super().save(*args, **kwargs)
