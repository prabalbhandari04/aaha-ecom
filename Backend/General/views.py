from django.http.response import HttpResponse, HttpResponseBadRequest
from rest_framework import exceptions, generics, mixins, serializers
from rest_framework import response
from rest_framework.response import Response
from rest_framework.views import APIView
from CustomUser.models import StoreDetail, UserProfile
from General.models import Review
from General.serializers import ReviewSerializer

from Product.models import Category, Product, StoreCategory
from Product.serializer import ProductDetailSerializer, ProductSerializer, StoreSerializer
from django.utils.decorators import method_decorator
from core.decorator import check_token

@method_decorator(check_token, name='dispatch')
class CreateReview(generics.CreateAPIView):
    serializer_class = ReviewSerializer

    def post(self,request,*args, **kwargs):
        request.data['user']=self.kwargs['user'].id
        return self.create(request,*args, **kwargs)

@method_decorator(check_token, name='dispatch')
class GetUpdateDestroyReview(generics.RetrieveUpdateDestroyAPIView):
    queryset=Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_field='id'

    def get(self,request,*args, **kwargs):
        try:
            if Review.objects.filter(food_id=self.kwargs['id'],user=self.kwargs['user']).exists():
                return Response(self.serializer_class(Review.objects.get(food_id=self.kwargs['id'],user=self.kwargs['user'])).data)
            else:
                return HttpResponseBadRequest("Review doesnot exist.")
        except:
            return HttpResponseBadRequest(None)
    def post(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        review_obj=Review.objects.filter(id=kwargs['id'],user=self.kwargs['user']).first()
        print(review_obj)

        if review_obj is None:
            raise exceptions.NotFound("Review not found.")
        review_obj.delete()
        return Response("Review deleted successfully.")
        
