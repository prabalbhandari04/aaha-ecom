from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken import views
from CustomUser.utils import refresh_token_view

from CustomUser.views import AddressUpDelView, ForgotPassword,Login, Register, UpdateProfile, activation,UpdateUserPw, smtpChangePw, token_validity

urlpatterns = [
    # path('obtain-token/', views.obtain_auth_token),
    path('validate_token/', token_validity),
    path('login/',Login.as_view(),name='login'),
    # path('deliverylogin',DeliveryLogin.as_view()),
    path('getNewAccess/',refresh_token_view),
    path('register/',Register.as_view(),name='user-register'),
    path('activate/', activation),
    path('updateProfile/', UpdateProfile.as_view()),
    path('updateUser/<int:id>/', UpdateUserPw.as_view()),
    path('changePassword/<str:token>/', ForgotPassword.as_view()),
    path('changePassword/', ForgotPassword.as_view()),
    path('forgotmail/', smtpChangePw),
    # path('addAddress/', AddressView.as_view()),
    path('updateDeleteAddress/<int:id>/', AddressUpDelView.as_view()),
    # path('get_user/',GetUser.as_view()),
    # path('get_user_address/',GetUserAddress.as_view()),
]   