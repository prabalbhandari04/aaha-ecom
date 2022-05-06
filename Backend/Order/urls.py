from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from .views import createOrder, RetriveOrders
urlpatterns = [
    path('addOrder/', createOrder.as_view()),
    # path('reOrder/', ReOrder.as_view()),
    # path('userOrder/', GetUserOrder.as_view()),
    path('getOrder/<int:id>', RetriveOrders.as_view()),
    # path('getCart/', getCart.as_view()),
    # path('addCart/', createCart.as_view()),
    # path('change_item_quantity/', changeQuantityCart.as_view()),
    # path('delete_extra/', deleteExtraCart.as_view()),
    # path('get_pending_order/', GetPendingOrder.as_view()),
    # path('get_completed_order/', GetCompletedOrder.as_view()),
    # path('getUpdateDeleteCart/<int:id>/', GetUpdateDestroyCart.as_view()),
    # path('deleteCart/', DestroyCartItem.as_view()),
    # path('get_new_assigned_order', GetAssignedNewOrders.as_view()),
    # path('accept_order/', AcceptOrder.as_view()),
    # path('reject_order/', RejectOrder.as_view()),
    # path('verify_delivery/', VerifyDelivery.as_view()),

    ]