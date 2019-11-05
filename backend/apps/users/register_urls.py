from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include
from . import views

urlpatterns = [
  url(r'^account', views.RegisterUserView.as_view(), name='register'),
  url(r'^success/', views.RegisterUserSuccessView.as_view(), name='register_success'),
  url(r'^failed/', views.RegisterUserFailedView.as_view(), name='register_failed'),
  url(r'^access_token/', views.UserAccessToken.as_view(), name='register_access_token'),
]
