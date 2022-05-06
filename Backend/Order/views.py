
from django.conf import Settings
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.http import response
from django.http.response import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound
from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import exceptions, generics, serializers
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from CustomUser import models
from Order.models import OrderInfo, Order, OrderStatus
from Order.serializer import (
    OrderItemSerializer,
    OrderSerialzier,
    ReturnOrderSerialzier,
)
from django.forms.models import model_to_dict
from django.db.models import Q
from Settings.models import Tax
from core.decorator import check_token


@method_decorator(check_token, name="dispatch")
class createOrder(APIView):
    def post(self, request, *args, **kwargs):
        totalAmount = 0
        data = JSONParser().parse(request)

        
        #Product

        listProduct = data["listProduct"]
        print(listProduct)
        serializer = OrderItemSerializer(data=listProduct, many=True)
        try:
            if serializer.is_valid():
                model_obj = serializer.save()  # Getting Order Item and serializing it
            else:
                raise exceptions.NotAcceptable(serializer.errors)

        except:
            raise exceptions.NotAcceptable("Products are not valid.")

        for obj in model_obj:  # Getting total price from Items Sent
            if obj.variant:
                totalAmount += (obj.variant.price) * float(obj.quantity)
            else:
                totalAmount += (obj.item.price) * float(obj.quantity)

        

        data["amount"] = totalAmount
        tempList = []
        for _ in model_obj:
            tempList.append(_.id)
        data["items"] = tempList

        # # Getting or Creating Order Address
        # if data["userAddress"] == None:
        #     address = data["orderAddress"]
        #     address_obj = Address.objects.filter(id=address).first()
        #     if address_obj is None:
        #         raise exceptions.NotFound("Address doesn't exist.")
        #     addressdata = model_to_dict(address_obj)
        #     addressSerializer = OrderAddressSerializer(data=addressdata)
        #     if addressSerializer.is_valid():
        #         address_obj = addressSerializer.save()
        #         data["DeliveryAddress"] = address_obj
        #     else:
        #         raise ValidationError("Address Incorrect")

        # else:
        #     address = data["userAddress"]
        #     address_obj = Address.objects.filter(id=address).first()
        #     if address_obj is None:
        #         raise exceptions.NotFound("Address doesn't exist.")
        #     addressdata = model_to_dict(address_obj)
        #     addressSerializer = OrderAddressSerializer(data=addressdata)
        #     if addressSerializer.is_valid():
        #         address_obj = addressSerializer.save()
        #         data["DeliveryAddress"] = address_obj.id
        #     else:
        #         raise ValidationError("Address Incorrect")

        # # Creating and serailizing Coupon objects
        # try:
        #     coupon=data["coupon"]
        # except:
        #     coupon=None
       
        
        # if coupon:
        #     couponObj = Coupons.objects.filter(id=coupon).first()
        #     if couponObj is not None:
        #         user_coupon_obj,created=User_Coupons.objects.get_or_create(user=self.kwargs['user'],coupon=couponObj)
        #         if not created:
        #             if user_coupon_obj.used:
        #                 raise exceptions.PermissionDenied("Coupon already used.")
        #         if coupon.isReward:
        #             coupon.status=False
        #             coupon.save()

        #         if not couponObj.isReward:    
        #             user_coupon_obj.used=True
        #             user_coupon_obj.save()

        #         if couponObj.unitType == "1":
        #             data["couponAmount"] = couponObj.discount * totalAmount
        #         else:
        #             data["couponAmount"] = couponObj.discount
        # else:
        #     data["couponAmount"] = 0
        

        

        # Creating and serailizing Discount objects
        # discountObj=Discount.objects.get(id=1)
        # if discountObj.unitType=='1':
        #     data['discountAmount']=discountObj.amount*totalAmount
        # else:
        #     data['discountAmount']=discountObj.amount

        data["discountAmount"] = 0

        # # Shipping Rule

        # shippingPrice = 0
        # shippingZoneObj = ShippingZone.objects.filter(city=address_obj.city).first()
        # if shippingZoneObj is None:
        #     raise exceptions.NotFound("Shipping rule doesn't exist.")
        # for _ in shippingZoneObj.shippingClass.all().order_by("priority"):
        #     if _.type == 2:
        #         if _.start <= totalAmount and _.end >= totalAmount:
        #             shippingPrice += _.price
        #             break
        #     if _.type == 1:
        #         if _.start <= totalWeight and _.end >= totalWeight:
        #             shippingPrice += _.price
        #             break

        # data["shipAmount"] = shippingPrice
        extraPrice=0 #temporary
        # totalAmount = (
        #     totalAmount + extraPrice - data["couponAmount"] - data["discountAmount"]
        # )

        taxObj,created = Tax.objects.get_or_create(id=1)
        if taxObj.type == 1:
            tax = (taxObj.amount / 100) * totalAmount
        else:
            tax = taxObj.amount
            
        data["taxAmount"]=tax
        totalAmount = totalAmount + tax

        data["user"] = self.kwargs["user"].id

        # totalAmount=totalAmount+shippingPrice
        # totalAmount = totalAmount + 200 #static shipping price
        data["grandAmount"] = totalAmount

        # Checking if the total amount sent from front end is valid
        # if data['total'] != None:
        # if totalAmount==data['total']:
        # print(data)
        orderSerilize = OrderSerialzier(data=data, many=False)
        if orderSerilize.is_valid():
            model_obj = orderSerilize.save()
            # current_cart=Cart.objects.get(user=self.kwargs['user'])
            # current_cart.items.set([])

            #Bill No. Receipt No.
            bill_instance,created=OrderInfo.objects.get_or_create(id=1)
            bill_instance.billNo+=1
            bill_instance.receiptNo+=1
            bill_instance.save()

            model_obj.billNo=bill_instance.billNo
            model_obj.receiptNo=bill_instance.receiptNo
            model_obj.save()

            # Refer
            # refer_obj=Refer.objects.filter(referedTo=self.kwargs['user']).first()
            # if refer_obj:
            #     if not refer_obj.status:
            #         referedBy,created=Reward.objects.get_or_create(user=refer_obj.referedBy)
            #         referedTo,created=Reward.objects.get_or_create(user=refer_obj.referedTo)
            #         setting=appSettings.objects.get(id=1)
            #         referedBy.points+=setting.referReward
            #         referedTo.points+=setting.referReward
            #         refer_obj.status=True
            #         refer_obj.save()
            #         referedBy.save()
            #         referedTo.save()


            # address_ser = OrderReturnSerializer(address_obj).data

            return Response(
                {
                    "status": "Order Created Successfully.",
                    "billNo":bill_instance.billNo,
                    "receiptNo":bill_instance.receiptNo,
                    "data": ReturnOrderSerialzier(
                        Order.objects.get(id=model_obj.id)
                    ).data,
                    # "address": address_ser,
                }
            )

        # # Coupon use
        #     if User_Coupons.objects.filter(coupon=couponObj,user_id=self.kwargs['user'].id).exists():
        #         coupon_user_obj=User_Coupons.objects.get(coupon=couponObj,user_id=data['user'])
        #         coupon_user_obj.used=True
        #         coupon_user_obj.save()

        #         rewardPoints=totalAmount*(2/100)
        #         reward_obj=Reward.objects.get_or_create(user_id=data['user'])
        #         reward_obj.points+=rewardPoints
        #         reward_obj.save()

        else:
            #    return Response({
            #         'status':'error',
            #         'message':'Order not created.'
            #     })
            print(orderSerilize.errors)
            return HttpResponse("error")
            # else:
            #     raise ValidationError("Please don't tamper with the product prices.")


@method_decorator(check_token,name='dispatch')
class RetriveOrders(APIView):
    def get(self,request,*args, **kwargs):
        query=Order.objects.filter(user=self.kwargs['user'])
        if query:
            return Response({"detail":ReturnOrderSerialzier(query,many=True).data})
        else:
            return Response({"detail":[]})
            


# @method_decorator(check_token, name="dispatch")
# class createCart(APIView):
#     def post(self, request, *args, **kwargs):
#         # [{quantiy=10,variant=id,items=id,extra=[id]}]
#         _ = request.data
#         quantity= _.get("quantity")
#         variant=_.get("variant")
#         item=_.get("item")
#         extra=_.get("extra")

#         item_obj,created=CartItem.objects.get_or_create(variant_id=variant,items_id=item)
#         if created:
#             item_obj.quantity=quantity
#             print(True)
#         else:
#             item_obj.quantity+=quantity
#         for id in extra:
#             obj=Extra.objects.get(id=id)
#             item_obj.extra.add(obj)

#         cart_obj,created=Cart.objects.get_or_create(user=self.kwargs["user"])
#         cart_obj.items.add(item_obj.id)
#         item_obj.save()

#         response=Response()
#         response.data=CartSerializer(cart_obj).data
#         return response

# @method_decorator(check_token, name="dispatch")
# class getCart(APIView):
#     def get(self, request, *args, **kwargs):
#         query=Cart.objects.filter(user=self.kwargs["user"]).first()
#         if query is None:
#             return HttpResponseNotFound("Cart not found.")
#         response=Response()
#         response.data=CartSerializer(query,many=False).data
#         return response

# @method_decorator(check_token, name="dispatch")
# class changeQuantityCart(APIView):
#     def post(self, request, *args, **kwargs):
#         cartItem=request.data.get("id")
#         quantity=request.data.get("quantity")
#         if cartItem is None or quantity is None:
#             return HttpResponseBadRequest("Invalid cart or quantity.")
#         cartItem_obj=CartItem.objects.filter(id=cartItem).first()
#         if cartItem_obj is None:
#             return HttpResponseNotFound("Cart not found.")
#         cartItem_obj.quantity=quantity
#         cartItem_obj.save()
#         return HttpResponse("Success.")

# @method_decorator(check_token, name="dispatch")
# class deleteExtraCart(APIView):
    def post(self, request, *args, **kwargs):

        cartItem=request.data.get("id")
        id=request.data.get("extra")

        if cartItem is None or id is None:
            return HttpResponseBadRequest("Invaid cart or quantity.")
        cartItem_obj=CartItem.objects.filter(id=cartItem).first()

        if cartItem_obj is None:
            return HttpResponseNotFound("Cart not found.")
        
        extra_obj=Extra.objects.filter(id=id).first()

        if extra_obj is None:
            return HttpResponseNotFound("Invalid Extra.")

        extras=list(cartItem_obj.extra.all())

        extras.remove(extra_obj)

        print(extras)
        cartItem_obj.extra.set(extras)

        return HttpResponse("Success")
        
        


# @method_decorator(check_token, name="dispatch")
# class GetUpdateDestroyCart(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Cart.objects.all()
#     serializer_class = CartSerializer
#     lookup_field = "id"

#     def post(self, request, *args, **kwargs):
#         return self.partial_update(request, *args, **kwargs)

# @method_decorator(check_token, name="dispatch")
# class DestroyCartItem(APIView):
#     def post(self, request, *args, **kwargs):
#         id=request.data.get('id')
#         cart=Cart.objects.filter(user=kwargs['user']).first()
#         if cart is None:
#             raise exceptions.NotFound("Cart invalid.")
#         cartitem_obj=CartItem.objects.filter(id=id).first()
#         if cartitem_obj is None:
#             raise exceptions.NotFound("Cart Item not found.")
#         if cartitem_obj not in cart.items.all():
#             raise exceptions.NotFound("Cart Item invalid.")
        
#         cartitem_obj.delete()

#         return Response("Success")


# @method_decorator(check_token, name="dispatch")
# class GetAssignedOrders(generics.ListAPIView):
#     queryset = Order.objects.all()
#     serializer_class = DeliveryBoyNewOrdersSerializer

#     def get_queryset(self):
#         return self.queryset.filter(
#             deliveryPerson_id=self.kwargs["user"].id, status=OrderStatus.pending.value
#         )


# @method_decorator(check_token, name="dispatch")
# class AcceptOrder(APIView):
#     def post(self, request, *args, **kwargs):
#         userID = self.kwargs["user"].id
#         orderID = request.data.get("orderID")

#         if userID and orderID:
#             try:
#                 order = Order.objects.get(id=orderID, deliveryPerson_id=userID)
#                 order.status = 3
#                 order.save()

#                 return Response("You accepted the order.")
#             except:
#                 raise Exception("Order is not valid.")

#         else:
#             raise Exception("UserID and OrderID required.")


# @method_decorator(check_token, name="dispatch")
# class RejectOrder(APIView):
#     def post(self, request, *args, **kwargs):
#         userID = self.kwargs["user"].id

#         orderID = request.data.get("orderID")

#         if userID and orderID:
#             try:
#                 order = Order.objects.get(id=orderID, deliveryPerson_id=userID)
#                 order.status = 1
#                 order.deliveryPerson = None
#                 order.save()

#                 return Response("You rejected the order.")
#             except:
#                 raise Exception("Order is not valid.")

#         else:
#             raise Exception("UserID and OrderID required.")


# @method_decorator(check_token, name="dispatch")
# class VerifyDelivery(APIView):
#     def post(self, request, *args, **kwargs):
#         userID = self.kwargs["user"].id

#         orderID = request.data.get("orderID")
#         identifier = request.data.get("identifier")

#         if userID and orderID and identifier:
#             password = str(orderID) + str(userID)

#             iden = identifier.split("'")[1].encode()
#             print(iden)
#             if bcrypt.checkpw(password.encode(), iden):
#                 try:
#                     order = Order.objects.get(id=orderID)
#                 except:
#                     order = None

#                 if order is not None:
#                     order.status = 4
#                     order.save()
#                     return Response("Delivery Successful.")

#                 else:
#                     raise Exception("Order doesn't exist.")

#             else:
#                 raise Exception("Order is not valid.")

#         else:
#             raise Exception("UserID, OrderID and identifier required.")


# @method_decorator(check_token, name="dispatch")
# class GetUserOrder(APIView):
#     def get(self, request, *args, **kwargs):
#         query = Order.objects.filter(user=self.kwargs["user"])
#         return Response(UserOrderSerializer(query, many=True).data)


# @method_decorator(check_token, name="dispatch")
# class GetPendingOrder(APIView):
#     def get(self, request, *args, **kwargs):
#         query = Order.objects.filter(~Q(status=4), user=self.kwargs["user"])
#         return Response(UserOrderSerializer(query, many=True).data)


# @method_decorator(check_token, name="dispatch")
# class GetCompletedOrder(APIView):
#     def get(self, request, *args, **kwargs):
#         query = Order.objects.filter(user=self.kwargs["user"], status=4)
#         return Response(UserOrderSerializer(query, many=True).data)


# @method_decorator(check_token, name="dispatch")
# class ReOrder(APIView):
#     def post(self, request, *args, **kwargs):
#         order_obj = Order.objects.filter(id=request.data.get("order")).first()
#         if order_obj is None:
#             raise exceptions.NotFound("Order Not Found.")
#         delivery_obj = DeliverAddress.objects.filter(
#             id=order_obj.DeliveryAddress.id
#         ).first()
#         if delivery_obj is None:
#             raise exceptions.NotFound("Address Not Found.")
#         extras = order_obj.extras.all()
#         items = order_obj.items.all()
#         order_obj.id = None
#         order_obj.save()
#         order_obj.extras.set(extras)
#         order_obj.items.set(items)

#         return Response(
#             {
#                 "status": "Order Created Successfully.",
#                 "data": ReturnOrderSerialzier(order_obj).data,
#                 "address": OrderReturnSerializer(delivery_obj).data,
#             }
#         )


# @method_decorator(check_token, name="dispatch")
# class GetAssignedNewOrders(generics.ListAPIView):
#     queryset = Order.objects.all()
#     serializer_class = DeliveryBoyNewOrdersSerializer

#     def get_queryset(self):
#         return self.queryset.filter(
#             deliveryPerson_id=self.request.user.id, status=OrderStatus.pending.value
#         )
