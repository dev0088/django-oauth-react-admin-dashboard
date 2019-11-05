from django.conf.urls import url
from . import views, users_views

urlpatterns = [
    url(r'^', views.UserOauth2TokenAPIView.as_view(), name='user-oauth2-tokens-list')
]
