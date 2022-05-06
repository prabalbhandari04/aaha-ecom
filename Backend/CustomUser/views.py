import re
from django.contrib.auth.models import User
from django.http import request
from django.http import response
from django.http.response import (
    HttpResponse,
    HttpResponseBadRequest,
    HttpResponseForbidden,
    JsonResponse,
)
from django.shortcuts import render
from django.views.generic.base import TemplateView
from rest_framework.response import Response
from rest_framework import authentication, exceptions, permissions, serializers
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.parsers import JSONParser
from CustomUser.models import Profile, UserProfile
# from Order.models import Order
# from Settings.models import Reward, User_Coupons
from core.decorator import check_token
from .utils import generate_access_token, generate_refresh_token
from CustomUser.serializer import (
    ProfileSeriL,
    ProfileSerializer,
    UserSerializer,
)
from django.core.mail import send_mail
from core import settings
import jwt
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, mixins, serializers
# from .models import Address
import jwt
from jwt import exceptions as e
from django.utils.decorators import method_decorator
import datetime


def decypher(token):
    data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    return data["user"]


def encrypt(payload):
    token = jwt.encode(payload, settings.SECRET_KEY)
    return token


def smtp(payload, email):
    token = encrypt({"user": payload})
    subject = "Welcome to Sweed."
    message = (
        "Hello, "
        + " Please click on this link to activate your account: "
        + "http://127.0.0.1:8000/user/activate/?token="
        + str(token)
    )
    recepient = email
    send_mail(
        subject, message, settings.EMAIL_HOST_USER, [recepient], fail_silently=False
    )


@csrf_exempt
def smtpChangePw(payload, email):
    token = encrypt(
        {
            "user": payload,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=15),
            "iat": datetime.datetime.utcnow(),
        }
    )
    subject = "Request to change Password."
    message = (
        "You have requested to change your password , "
        + " Please click on this link to do so: "
        + "http://127.0.0.1:8000/user/changePassword/"
        + str(token)
    )
    recepient = email
    send_mail(
        subject, message, settings.EMAIL_HOST_USER, [recepient], fail_silently=False
    )


def token_validity(request):
    token = request.headers.get("token")
    try:
        data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return HttpResponse("Valid")
    except e.ExpiredSignatureError:
        return HttpResponseBadRequest("Token Expired, Please refetch access token")
    except e.InvalidSignatureError:
        return HttpResponseForbidden("Token Invalid")
    except e.DecodeError:
        return HttpResponseForbidden("Token Invalid")


@csrf_exempt
def activation(request):

    try:
        token_get = request.GET.get("token")

        decrypt = decypher(bytes(token_get, "utf-8"))
        user = UserProfile.objects.get(id=decrypt)
        if user:
            user.is_active = True
            user.save()
    except:
        return JsonResponse(status=400)
    return JsonResponse({"message": "Congrats, Your account is activaed."})


class Login(APIView):
    # queryset = UserSerializer.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        phone=request.data.get("phone")
        password = request.data.get("password")
        response = Response()

        if (email is None) and (phone is None):
            raise exceptions.AuthenticationFailed("email or phone required")

        if (password is None):
            raise exceptions.AuthenticationFailed("Password required")

        if email:
            user = UserProfile.objects.filter(email=email).first()

        if phone:
            user = UserProfile.objects.filter(username=phone).first()


        if user is None:
            raise exceptions.AuthenticationFailed("user not found")
        

        if not user.check_password(password):
            raise exceptions.AuthenticationFailed("wrong password")
        

        serialized_user = UserSerializer(user).data
        access_token = generate_access_token(user)
        refresh_token = generate_refresh_token(user)

        response.set_cookie(key="refreshtoken", value=refresh_token, httponly=True)
        response.data = {
            "access_token": access_token,
            "refresh_token": refresh_token,
        }

        return response


class Register(APIView):

    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        data = request.data.dict()
        try:
            email = data["email"]
        except:
            email=None
        try:
            username = data["username"]
        except:
            username=None
    
        if email:
            userp = UserProfile.objects.filter(email=email).first()
            data["user"] = {
                "email": email,
                "password": data["password"],
            }
        elif username:
            userp = UserProfile.objects.filter(username=username).first()
            data["user"] = {
                "username": username,
                "password": data["password"],
            }
        else:
            userp=None
        
        if userp != None :
            raise exceptions.NotAcceptable("Phone or Email already in use.")
        serializer2 = ProfileSerializer(data=data)
        if serializer2.is_valid():

            serializer2.save()
            if email:
                user = UserProfile.objects.get(email=email)
            if username:
                user = UserProfile.objects.get(username=username)


            # smtp(user.pk, email)

            return Response({"User successfully created"})
        else:
            raise exceptions.ValidationError("User validation Error")


@method_decorator(check_token, name="dispatch")
class UpdateProfile(generics.UpdateAPIView):
    def post(self, request, *args, **kwargs):
        instance = Profile.objects.filter(user=self.kwargs["user"]).first()
        if instance is None:
            raise exceptions.NotFound("Profile doesn't exist.")
        serializer = ProfileSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response("Profile updated successfully.")


@method_decorator(check_token, name="dispatch")
class UpdateUserPw(APIView):
    def post(self, request, *args, **kwargs):
        currentPassword = request.data.get("currentPassword")
        newPw1 = request.data.get("newPassword")
        newPw2 = request.data.get("validatePassword")
        if newPw1 is not None:
            if newPw1 == newPw2:
                user_obj = UserProfile.objects.get(id=self.kwargs["user"].id)

                if user_obj.check_password(currentPassword):
                    user_obj.set_password(newPw1)
                    user_obj.save()
                    return HttpResponse("Password Changed Successfully.")
                else:
                    raise ValueError("Password Error, Please check again.")
            else:
                raise ValueError("Password Doesn't match.")
        else:
            raise ValueError("Password Can't Be None.")


@method_decorator(check_token, name="dispatch")
class ForgotPassword(APIView):
    def get(self, request, *args, **kwargs):
        user_obj = UserProfile.objects.get(id=self.kwargs["user"].id)
        smtpChangePw(self.kwargs["user"].id, user_obj.email)

    def post(self, request, token, *args, **kwargs):
        try:
            decrypt = decypher(bytes(token, "utf-8"))
            user_obj = UserProfile.objects.filter(id=decrypt).first()

            if user_obj is None:
                raise exceptions.AuthenticationFailed("User not found")

            user_obj.set_password(request.data.get("password"))
            user_obj.save()
            return HttpResponse("Success")

        except jwt.DecodeError:
            raise exceptions.AuthenticationFailed(
                {"message": "Refresh token error, please try again.", "statusCode": 106}
            )
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed(
                {
                    "message": "expired refresh token, please login again.",
                    "statusCode": 106,
                }
            )


# class AddressView(generics.CreateAPIView):
#     serializer_class = AddressSerializer


# class AddressUpDelView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Address.objects.all()
#     serializer_class = AddressSerializer
#     lookup_field = "id"

#     def post(self, request, *args, **kwargs):
#         return self.partial_update(request, *args, **kwargs)


# @method_decorator(check_token, name="dispatch")
# class AddressUpDelView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Address.objects.all()
#     serializer_class = AddressSerializer


class AddressUpDelView(generics.RetrieveUpdateDestroyAPIView):
    def post(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


# @method_decorator(csrf_exempt, name="dispatch")
# class DeliveryLogin(APIView):
#     serializer_class = UserSerializer

#     def post(self, request, *args, **kwargs):
#         email = request.data.get("email")
#         password = request.data.get("password")

#         response = Response()

#         if (email is None) or (password is None):
#             raise exceptions.AuthenticationFailed("email and password required")

#         group = UserProfile.objects.filter()
#         user = UserProfile.objects.filter(email=email, groups__name="delivery").first()
#         if user is None:
#             raise exceptions.AuthenticationFailed("user not found")
#         if not user.check_password(password):
#             raise exceptions.AuthenticationFailed("wrong password")

#         serialized_user = UserSerializer(user).data
#         access_token = generate_access_token(user)
#         refresh_token = generate_refresh_token(user)

#         response.set_cookie(key="refreshtoken", value=refresh_token, httponly=True)
#         response.data = {
#             "access_token": access_token,
#             "refresh_token": refresh_token,
#         }

#         return response


# @method_decorator(check_token, name="dispatch")
# class GetUser(APIView):
#     def get(self, request, *args, **kwargs):
#         response = Response()
#         if Profile.objects.filter(user_id=self.kwargs["user"].id).exists():
#             reward_obj = Reward.objects.filter(user=self.kwargs["user"])
#             profile_obj = Profile.objects.filter(user_id=self.kwargs["user"].id).first()
#             order_query = Order.objects.filter(user=self.kwargs["user"])
#             coupon_query = User_Coupons.objects.filter(
#                 user=self.kwargs["user"], used=True
#             )

#             response.data = {
#                 "profile": ProfileSerializer(profile_obj).data,
#                 "user": UserSer(self.kwargs["user"]).data,
#                 "reward": reward_obj[0].points if reward_obj.exists() else 0,
#                 "orderCount": order_query.count() if order_query.exists() else 0,
#                 "coupons": coupon_query.count() if coupon_query.exists() else 0,
#             }
#             return response
#         else:
#             response.data = "User Profile Not Found."
#             response.status_code = 701
#             return response


# @method_decorator(check_token, name="dispatch")
# class GetUserAddress(generics.ListAPIView):
#     queryset = Address.objects.all()
#     serializer_class = AddressSerializer

#     def get_queryset(self):
#         queryset = Address.objects.filter(user_id=self.kwargs["user"].id)
#         return queryset
