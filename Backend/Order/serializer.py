from re import L
from django.contrib.auth.models import Group
from django.db import models
from django.db.models import fields, manager
from django.db.models.aggregates import Variance
from rest_framework import serializers
from CustomUser.serializer import  ProfileSerializer
from Product.models import Variant

from .models import Order, OrderItem, OrderStatus

# class CartVariant(serializers.ModelSerializer):
#     title = serializers.SerializerMethodField()
#     class Meta:
#         model=Variant
#         fields=["id","price","title"]

#     def get_title(self,obj:Variant):
#         title=[]
#         for _ in obj.items.all():
#                 title.append(_.attributeItem.title)
#         return title


# class CartItemSerializer(serializers.ModelSerializer):
#     extra=ExtraItemSerializer(many=True)
#     cart_id = serializers.CharField(source="id")
#     item_id = serializers.CharField(source="items.id")
#     title = serializers.CharField(source="items.title")
#     category=serializers.CharField(source="items.category.title")
#     coverImage = serializers.SerializerMethodField()
#     newPrice = serializers.CharField(source="items.newPrice")
    
#     variant=CartVariant()
#     class Meta:
#         model=CartItem
#         fields=["cart_id","item_id","title","category","quantity","newPrice","coverImage","variant","extra"]
#         depth=2
    
#     def get_coverImage(self, obj: CartItem):
#         return obj.items.coverImage.file.url[1:]

# class CartSerializer(serializers.ModelSerializer):
#     items=CartItemSerializer(many=True)
#     class Meta:
#         model = Cart
#         fields = "__all__"


# class orderExtraSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ExtraOrder
#         fields = "__all__"


# class OrderSerialzier(serializers.ModelSerializer):
#     extras = orderExtraSerializer(data="extras", read_only=True, many=True).initial_data

#     class Meta:
#         model = Order
#         # depth=1
#         exclude = ["transaction"]

class CartVariant(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    class Meta:
        model=Variant
        fields=["id","price","title"]

    def get_title(self,obj:Variant):
        title=[]
        for _ in obj.items.all():
                title.append(_.attributeItem.title)
        return title
        
class ReturnOrderItem(serializers.ModelSerializer):
    name = serializers.CharField(source="item.title", read_only=True)
    price = serializers.CharField(source="item.newPrice", read_only=True)
    variant=CartVariant(many=False)
    category= serializers.CharField(source="item.category.title", read_only=True)
    coverImage_url = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ["id","category","quantity", "name", "price","coverImage_url","variant"]

    def get_coverImage_url(self, obj: OrderItem):
        return obj.item.coverImage.file.url[1:]


class ReturnOrderSerialzier(serializers.ModelSerializer):
    items = ReturnOrderItem(data="items", many=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "amount",
            "billNo",
            "receiptNo",
            "createdAt",
            "taxAmount",
            "shipAmount",
            "extraAmount",
            "couponAmount",
            "discountAmount",
            "grandAmount",
            "items",
            "identifier",
        ]


# class OrderAddressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DeliverAddress
#         fields = "__all__"


# class OrderReturnSerializer(serializers.ModelSerializer):
#     state = serializers.CharField(source="state.title")
#     country = serializers.CharField(source="country.title")
#     city = serializers.CharField(source="city.title")

#     class Meta:
#         model = DeliverAddress
#         fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = "__all__"
class OrderSerialzier(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields='__all__'

# class DeliveryBoyNewOrdersSerializer(serializers.Serializer):
#     orderKey = serializers.CharField(read_only=True, source="identifier")
#     customerName = serializers.CharField(
#         read_only=True, source="user.profile_full_name"
#     )
#     customerEmail = serializers.CharField(read_only=True, source="user.email")
#     customerPhone = serializers.SerializerMethodField("phoneNumber")
#     customerAvatar = serializers.CharField(read_only=True, source="user.profile.avatar")
#     totalAmount = serializers.FloatField(source="grandAmount")
#     location = AddressSerializer(source="DeliveryAddress", customizeDepth=1)
#     products = OrderItemSerializer(
#         source="items",
#         many=True,
#         customizeFields=["quantity", "item", "id"],
#         customizeDepth=1,
#         concentrated_product=True,
#     )

#     def phoneNumber(self, obj: Order):
#         if obj.user.profile_exists():
#             return obj.user.profile().phone
#         else:
#             return None


# class ItemImageSerializer(serializers.ModelSerializer):
#     coverImage_url = serializers.CharField(
#         source="item.coverImage.file.url", read_only=True
#     )

#     class Meta:
#         model = Item
#         fields = ["coverImage_url"]


# class AddressOrder(serializers.ModelSerializer):
#     class Meta:
#         model = Address
#         fields = ["streetAdd1"]


# class UserOrderSerializer(serializers.ModelSerializer):
#     # items = ItemImageSerializer(data="items", read_only=True, many=True)
#     items = serializers.SerializerMethodField()
#     # status=serializers.CharField(source='status.name',read_only=True)
#     address = AddressOrder(source="DeliveryAddress", read_only=True)
#     status = serializers.SerializerMethodField()

#     class Meta:
#         model = Order
#         fields = [
#             "id",
#             "order_number",
#             "status",
#             "couponAmount",
#             "discountAmount",
#             "grandAmount",
#             "createdAt",
#             "items",
#             "address",
#         ]

#     def get_status(self, obj: Order):
#         return OrderStatus(obj.status).name
    
#     def get_items(self,obj:Order):
#         return [i.get('coverImage_url')[1:] for i in ItemImageSerializer(obj.items,read_only=True,many=True).data]
