from django.urls import include, path
from rest_framework import routers

# from backend.API.views import BlacklistTokenView
from . import views

router = routers.DefaultRouter()
router.register(r'message', views.TestView)

urlpatterns = [
    path('', include(router.urls)),
    path('logout/blacklist/', views.BlacklistTokenView.as_view(), name="blacklist")
]
