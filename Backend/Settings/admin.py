from django.contrib import admin

from Settings.models import MaintainanceMode, Tax, appSettings

admin.site.register(appSettings)
admin.site.register(Tax)
admin.site.register(MaintainanceMode)