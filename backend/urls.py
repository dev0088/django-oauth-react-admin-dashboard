from django.conf.urls import url, include
from django.contrib.auth.views import LoginView, logout_then_login
from django.urls import path
from django.contrib import admin
from django.conf.urls.static import static, serve
from django.conf import settings

from .views import app, index, home

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/users/', include('users.users_urls')),
    url(r'^api/calendars/', include('events.urls')),
    url(r'^api/auth-tokents/', include('users.urls')),
    url(r'^register/', include('users.register_urls')),
    url(r'^app/', app, name='app'),
    url('^auth/logout/$', logout_then_login, name='logout'),
    url('^auth-social/', index, name='auth-social'),
    url('^privacy/', admin.site.urls),
    url('termsofservice', admin.site.urls),
    path('', include('social_django.urls', namespace='social')),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT,}),
    url(r'^$', app, name='app')
]
