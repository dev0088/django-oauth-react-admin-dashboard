from django.conf.urls import url, include
from django.contrib.auth.views import LoginView, logout_then_login
from django.urls import path
from django.contrib import admin
from django.conf.urls.static import static, serve
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_swagger.views import get_swagger_view
from rest_framework import permissions
from .views import app, index, home

swagger_schema_view = get_swagger_view(title='Youta API')

schema_view = get_schema_view(
   openapi.Info(
      title="Youta API",
      default_version='v1',
      description="REST API for Youta web and mobile app",
      terms_of_service="https://youtacalc.herokuapp.com/termsofservice/",
      contact=openapi.Contact(email="administrator@youtacalc.com"),
      license=openapi.License(name="youtacalc.com"),
   ),
   # validators=['flex', 'ssv'],
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    url(r'^apis(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^apis/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^swagger-docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),  
    url(r'^api/users/', include('users.users_urls')),
    url(r'^api/calendars/', include('events.urls')),
    url(r'^api/auth-tokents/', include('users.urls')),

    url(r'^admin/', admin.site.urls),
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
