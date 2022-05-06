from django.contrib import admin

from Product.models import Attribute, AttributeItem, Product,Variant, VariantItem

admin.site.register(Product)
admin.site.register(Variant)
admin.site.register(VariantItem)
admin.site.register(Attribute)
admin.site.register(AttributeItem)