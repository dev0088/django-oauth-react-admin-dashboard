import os



# SOCIAL_AUTH_URL_NAMESPACE = 'social'


GOOGLE_CALENDAR_API_APP_NAME = os.environ.get(
    'GOOGLE_CALENDAR_API_APP_NAME',
    'YoutaGoogleCalendarAnalytics'
)
GOOGLE_CALENDAR_API_REDIRECT_URI = os.environ.get(
    'GOOGLE_CALENDAR_API_REDIRECT_URI',
    'http://localhost:8000/register/access_token'
    # 'https://www.youtahq.com/register/access_token'
)
GOOGLE_CALENDAR_API_DEFAULT_CALENDAR_ID = os.environ.get(
    'GOOGLE_CALENDAR_API_DEFAULT_CALENDAR_ID',
    'primary'
)
GOOGLE_CALENDAR_API_SCOPES = os.environ.get(
    'GOOGLE_CALENDAR_API_SCOPES', 
    'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events'
)
REGISTER_URL = os.environ.get(
    'REGISTER_URL',
    'http://localhost:8000/register/access_token'
    # 'https://www.youtahq.com/register/access_token'
)