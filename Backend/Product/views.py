from django.http.response import HttpResponse, HttpResponseForbidden, HttpResponseNotFound
from rest_framework import exceptions, generics, mixins, serializers
from rest_framework import response
from rest_framework.response import Response
from rest_framework.views import APIView
from CustomUser.models import StoreDetail, UserProfile

from Product.models import Category, Product, StoreCategory
from Product.serializer import ProductDetailSerializer, ProductSerializer, StoreSerializer
from django.utils.decorators import method_decorator
from core.decorator import check_token

class GetStoreProduct(APIView):
    def get(self, request):
        response=Response()
        query=StoreDetail.objects.all()
        print(query)
        data=[]
        for _ in query:
            serializer=StoreSerializer(_,many=False).data
            print(serializer)
            appendData={
                "id":serializer["id"],
                "storeName":serializer["storeName"],
                "avatar":serializer["avatar"],
                "slug":serializer["slug"],
                "rating":serializer['rating'],
                "items":ProductSerializer(Product.objects.filter(store=_.store,isFeatured=True),many=True).data
            }
            data.append(appendData)
        
        response.data=data
        return response


class GetProduct(generics.GenericAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer

    def get(self, request, slug):
        store=StoreDetail.objects.filter(slug=slug).first()
        if store is None:
            raise exceptions.NotFound("Store not found.")
        queryset = self.queryset.filter(store=store.store)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

class GetProductDetail(generics.GenericAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer

    def get(self, request, slug):
        queryset = self.queryset.filter(slug=slug).first()
        serializer = ProductDetailSerializer(queryset, many=False)
        return Response(serializer.data)

@method_decorator(check_token, name="dispatch")
class CreateCategory(APIView):

    def post(self,request,*args, **kwargs):
        data=request.data
        try:
            items=data.pop('items')
        except:
            items=None
        obj=Category.objects.create(**data)
        if items:
            obj.items.set(items)
        storeCategory,created=StoreCategory.objects.get_or_create(user=self.kwargs['user'])
        storeCategory.categories.add(obj)
        
        return HttpResponse("Success")

@method_decorator(check_token, name="dispatch")
class CreateProduct(APIView):
    def post(self,request,*args, **kwargs):
        data=request.data
        currentUser=self.kwargs['user']
        isStoreQuery = StoreDetail.objects.filter(store=currentUser)
        if not isStoreQuery.exists():
            return HttpResponseForbidden("Invaid Request")

        data['store']=self.kwargs['user']
        Product.objects.create(**data)

        return HttpResponse('Success')

@method_decorator(check_token, name="dispatch")
class GetUpdateDestroyProduct(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_fields = "pk"

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = generics.get_object_or_404(queryset, **filter_kwargs)
        
        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        if obj.store==self.kwargs['user']:
            return obj
        else:
            raise exceptions.NotAcceptable("Not Valid Product.")

    def post(self, request, *args, **kwargs):

        return self.partial_update(request, *args, **kwargs)