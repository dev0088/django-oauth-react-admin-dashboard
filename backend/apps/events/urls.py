from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^events/', views.RetrieveEventsAPIView.as_view(), name='events-list'),
    url(r'^lists/', views.RetrieveCalendarListsAPIView.as_view(), name='calendars-list'),
]
