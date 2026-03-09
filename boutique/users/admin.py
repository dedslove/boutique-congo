from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'nom', 'prenom', 'is_staff', 'date_joined']
    list_filter = ['is_staff', 'is_active']
    fieldsets = [
        (None, {'fields': ['email', 'password']}),
        ('Informations', {'fields': ['nom', 'prenom']}),
        ('Permissions', {'fields': ['is_staff', 'is_active', 'is_superuser']}),
    ]
    add_fieldsets = [
        (None, {
            'classes': ['wide'],
            'fields': ['email', 'password1', 'password2', 'nom', 'prenom']
        }),
    ]
    search_fields = ['email']
    ordering = ['email']

admin.site.register(CustomUser, CustomUserAdmin)