from django.contrib import admin
from . import models

@admin.register(models.EmailUser)
class AccountAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'first_name',
        'last_name',
        'email',
        'last_login',
        'is_active',
        'date_joined',
        'last_updated',
        'google_oauth2_client_id',
        'google_oauth2_secrete',

    )

    list_display_links = (
        'id',
        'first_name',
        'last_name',
        'email',
        'last_login',
        'is_active',
        'date_joined',
        'google_oauth2_client_id',
        'last_updated'
    )

    list_per_page = 50

    search_fields = (
        'email',
        'first_name',
        'last_name'
    )

@admin.register(models.Oauth2Token)
class Oauth2TokenAdmin(admin.ModelAdmin):
    list_display = (
        'user_display',
        'access_token',
        'refresh_token',
        'token_expiry',
        'code',
        'created_at',
        'updated_at'
    )
    list_display_links = (
        'user_display',
        'access_token',
        'refresh_token',
        'token_expiry',
        'code',
        'created_at',
        'updated_at'
    )
    list_per_page = 50
    fields = ['user', 'access_token', 'refresh_token', 'token_expiry', 'code', 'text']

    def user_display(self, obj):
        return obj.user.email
