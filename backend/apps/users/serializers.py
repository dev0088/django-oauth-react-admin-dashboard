from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Oauth2Token

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'last_name', 'email', 'last_login',
            'is_active', 'date_joined', 'last_updated', 
            'google_oauth2_client_id', 'google_oauth2_secrete'
        )


class UserOauth2TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Oauth2Token
        fields = (
            'user', 'access_token', 'refresh_token', 'token_expiry',
            'code', 'text'
        )
