
from rest_framework.response import Response
from rest_framework.views import APIView

from django.utils.decorators import method_decorator
from Settings.models import MaintainanceMode, appSettings

class CheckMaintainance(APIView):
    def get(self,request,*args, **kwargs):

        model_obj,created=MaintainanceMode.objects.get_or_create(id=1)
        response=Response()
        response.data={
            "status":model_obj.status,
            "message":model_obj.message
        }
        return response

class BasicInfo(APIView):
    def get(self,request):
        obj,created=appSettings.objects.get_or_create(id=1)
        response=Response()

        
        response.data={
            "aboutUs":obj.aboutUs,
            "versionNumber":obj.versionNumber,
            "terms":obj.terms,
            "privacy":obj.privacy,
            "facebook":obj.facebook,
            "instagram":obj.instagram,
            "github":obj.github,

        }
        
        return response