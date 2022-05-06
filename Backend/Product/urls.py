from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from Product.views import CreateCategory, CreateProduct, GetProduct, GetProductDetail, GetStoreProduct, GetUpdateDestroyProduct

urlpatterns = [
    path('store/<str:slug>/', GetProduct.as_view()),
    path('', GetStoreProduct.as_view()),
    path('<str:slug>/', GetProductDetail.as_view()),
    path('category', CreateCategory.as_view()),
    path('product/', CreateProduct.as_view()),
    path('product/<int:id>', GetUpdateDestroyProduct.as_view()),

# CRUD product
]