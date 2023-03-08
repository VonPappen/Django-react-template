from rest_framework_simplejwt import token_blacklist
from django.contrib import admin
from .models import User
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'username', 'password',
                    "is_staff", 'date_joined', "is_active"]


admin.site.register(User, UserAdmin)
