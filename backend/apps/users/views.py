import os
import json
import logging
from rest_framework import viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.http import HttpResponse
from django.shortcuts import redirect
from django.views.generic.edit import FormView, CreateView, UpdateView, DeleteView
from tablib import Dataset
from django.conf import settings
from oauth2client import client
from .forms import RegisterUserForm
from .models import EmailUser, Oauth2Token
from .serializers import UserSerializer, UserOauth2TokenSerializer
# from drf_yasg.utils import swagger_auto_schema
from rest_framework import authentication, permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

User = get_user_model()

class UsersAPIView(APIView):
    
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data) 


class UserAPIView(APIView):
    """
    Retrieve all users.
    """
    def get(self, request, format=None):
        content = {
            'user': str(request.user),
            'auth': str(request.auth),
        }
        return Response(content)
    
    @classmethod
    def get_extra_actions(cls):
        return []

def generate_secret_file_name(user_id):
    return 'client_secret_{user_id}.json'.format(user_id=user_id)

def make_secret_file(user_id, client_id, client_secret, client_email):
    secret_data = {
        "web": {
            "client_id": client_id,
            "client_secret":client_secret,
            "auth_uri":"https://accounts.google.com/o/oauth2/auth",
            "token_uri":"https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
            "redirect_uris":[settings.GOOGLE_CALENDAR_API_REDIRECT_URI]
        }
    }
    file_name = generate_secret_file_name(user_id)
    # If exist file, remove it.
    if os.path.exists(file_name):
        os.remove(file_name)
    # Create a new file.
    f = open(file_name, "a+")
    f.write(json.dumps(secret_data))
    f.close()
    return file_name

def delete_secret_file(file_name):
    if os.path.exists(file_name):
        os.remove(file_name)


class UserOauth2TokenAPIView(APIView):
    # queryset = Oauth2Token.objects.all()
    # serializer_class = UserOauth2TokenSerializer
    # permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        oauth2tokens = Oauth2Token.objects.all()
        serializer = UserOauth2TokenSerializer(oauth2tokens, many=True)
        return Response(serializer.data)

class RegisterUserView(FormView):

    def authorize_with_google(self, user_email, client_secret_file_name):
        state = json.dumps({
            'user_email': user_email,
        })

        flow = client.flow_from_clientsecrets(
                    client_secret_file_name,
                    settings.GOOGLE_CALENDAR_API_SCOPES,
                    redirect_uri=settings.GOOGLE_CALENDAR_API_REDIRECT_URI,
                    cache=None,
                    prompt='consent'
                )
        ###################################################
        # Remote server  mode
        authorize_url = flow.step1_get_authorize_url(redirect_uri=settings.GOOGLE_CALENDAR_API_REDIRECT_URI, state=state)
        logging.info('Go to the following link in your browser: ' + authorize_url)
        return authorize_url

    def get(self, request, *args, **kwargs):        
        form = RegisterUserForm()
        context = {'form': form}
        return render(request, 'registration/register.html', context)

    def post(self, request, *args, **kwargs):
        form = RegisterUserForm(data=request.POST)
        if form.is_valid():
            valid_data = form.cleaned_data
            # Check user and add it.
            user = User.objects.filter(email=valid_data['email']).first()
            if user is None:
                user = User.objects.create(
                    email=valid_data['email'],
                    google_oauth2_client_id=valid_data['google_oauth2_client_id'],
                    google_oauth2_secrete=valid_data['google_oauth2_secrete'],
                    first_name=valid_data['first_name'],
                    last_name=valid_data['last_name']
                )
                user.save()
            else:
                user.google_oauth2_client_id=valid_data['google_oauth2_client_id']
                user.google_oauth2_secrete=valid_data['google_oauth2_secrete']
                user.first_name=valid_data['first_name']
                user.last_name=valid_data['last_name']
                user.save()
            
            ######################################################
            # Remote host mode
            client_secret_file_name = make_secret_file(
                user.id, 
                valid_data['google_oauth2_client_id'], 
                valid_data['google_oauth2_secrete'],
                valid_data['email']
            )
            authorize_url = self.authorize_with_google(valid_data['email'], client_secret_file_name)
            return redirect(authorize_url)
            
        return redirect(request, 'registration/register.html', {'form': form})

class UserAccessToken(FormView):

    def get(self, request, *args, **kwargs):
        # Check parameters
        query_params = request.GET
        query_params = request.GET
        if (not query_params) or (not 'code' in query_params) or (not 'state' in query_params):
            logging.error('Invalid params.')
            error_message = 'Failed step2 wiht invalid parameters.'
            return redirect('register_failed', error_message=error_message)
        
        code = query_params['code']
        state = json.loads(query_params['state'])
        user_email = state['user_email']

        logging.info('User: {user}, Auth code: {code}'.format(
                user=user_email,
                code=code
            )
        )

        # Check user
        user = User.objects.filter(email=user_email).first()
        if user is None: 
            logging.error('Failed step2 on google oauth2.')
            error_message = 'Failed step2. Your account wasn\'t created on step1.'
            # return redirect('/api/register/failed/?error_message=' + error_message)
            return redirect('register_failed', error_message=error_message)

        # Complete step2.
        client_secret_file_name = generate_secret_file_name(user.id)
        flow = client.flow_from_clientsecrets(
                    client_secret_file_name,
                    settings.GOOGLE_CALENDAR_API_SCOPES,
                    redirect_uri=settings.GOOGLE_CALENDAR_API_REDIRECT_URI,
                    cache=None,
                    prompt='consent'
                )
        credentials = flow.step2_exchange(code)
        delete_secret_file(client_secret_file_name)
        logging.info('User: {user}, Credentials: {credentials}'.format(
                user=user.email,
                credentials=credentials.to_json()
            )
        )
        logging.info('credentials: {}'.format(credentials.to_json()))
        str_credentials = credentials.to_json()
        json_credentials = json.loads(str_credentials)
        # Save credentials including access token.
        oauth2token = Oauth2Token.objects.filter(user_id=user.id).first()
        if oauth2token:
            oauth2token.delete()

        oauth2token = Oauth2Token.objects.create(
                          user_id=user.id,
                          access_token=json_credentials['access_token'],
                          refresh_token=json_credentials['refresh_token'],
                          token_expiry=json_credentials['token_expiry'],
                          code=code,
                          text=json.dumps(json_credentials)
                      )
        oauth2token.save

        message = 'Success to create your account and saved credentials. You can send your events now.'
        # return redirect('/api/register/success/?message=' + message)
        # return redirect('/app/users/?message=' + message)

        return redirect('app')


class RegisterUserSuccessView(FormView):
    def get(self, request, *args, **kwargs):
        return render(
                    request, 
                    'registration/success.html', 
                    {'message': request.GET['message']}
                )


class RegisterUserFailedView(FormView):
    def get(self, request, *args, **kwargs):
        return render(
                    request, 
                    'registration/failed.html', 
                    {'error_message': request.GET['error_message']}
                )
