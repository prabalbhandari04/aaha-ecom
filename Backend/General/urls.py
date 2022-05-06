from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from General.views import CreateReview, GetUpdateDestroyReview


urlpatterns = [
    path('getUpdateDeleteReview/<int:id>/', GetUpdateDestroyReview.as_view()),
    path('addReview/', CreateReview.as_view()),
]