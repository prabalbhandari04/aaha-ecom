from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from Settings.views import BasicInfo, CheckMaintainance

urlpatterns = [
    path('getAppInfo/',BasicInfo.as_view()),
    path('check_maintainance/',CheckMaintainance.as_view()),

]
