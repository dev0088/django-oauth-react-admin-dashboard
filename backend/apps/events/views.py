from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from .serializers import EventSerializer
from . import google_calendar
from users.models import Oauth2Token

User = get_user_model()

def get_credentials_from_db(user_id):
        oauth2token = Oauth2Token.objects.filter(user_id=user_id).first()
        credentials = None
        if oauth2token and oauth2token.text:
            credentials = oauth2token.text
        return credentials

class RetrieveEventsAPIView(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        user = request.user
        events = google_calendar.retrieve_events(
            user.google_oauth2_client_id, 
            user.google_oauth2_secrete,
            user.id,
            False,
            get_credentials_from_db(user.id)
        )
        return Response(events['items'])
    

class RetrieveCalendarListsAPIView(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        user = request.user
        events = google_calendar.retrieve_calendar_lists(
            user.google_oauth2_client_id, 
            user.google_oauth2_secrete,
            user.id,
            False,
            get_credentials_from_db(user.id)
        )  
        return Response(events['items'])
