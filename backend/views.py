import json

from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.urls import reverse
from django.shortcuts import render, redirect
from users.models import Oauth2Token, EmailUser

def index(request):
    if request.user.is_authenticated:
        return redirect(reverse("app"))
    else:
        return render(request, 'registration/login.html')

def home(request, *arg, **kwargs):
    if request.user.is_authenticated:
        return redirect(reverse("app"))
    else:
        return render(request, 'registration/login.html')

@login_required
def app(request):
    context = {
        'permissions': json.dumps(list(request.user.get_all_permissions()))
    }

    template = 'backend/app.html'
    return render(request, template, context)


# def app(request):
#     print('======== app: user: ', request.user)
#     if request.user.is_anonymous:
#         print('======== is anonymous user')
#         return redirect(settings.LOGIN_URL)
    
#     oauth2_token = Oauth2Token.objects.filter(user=request.user).first()
#     if oauth2_token and oauth2_token.access_token:
#         print('======== have oauth2_token')
#         context = {
#             'permissions': json.dumps(list(request.user.get_all_permissions()))
#         }

#         template = 'backend/app.html'
#         return render(request, template, context)

#     else:
#         print('======== do not have oauth2_token')
#         return redirect(settings.LOGIN_URL)
