from django.contrib.auth import get_user_model
from rest_framework import serializers
from users.models import Oauth2Token

User = get_user_model()


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'last_name', 'email', 'last_login',
            'is_active', 'date_joined', 'last_updated', 
            'google_oauth2_client_id', 'google_oauth2_secrete'
        )
