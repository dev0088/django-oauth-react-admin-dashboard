from rest_framework.routers import DefaultRouter

from .users_views import UserViewSet

router = DefaultRouter()
router.register(r'', UserViewSet)
urlpatterns = router.urls
