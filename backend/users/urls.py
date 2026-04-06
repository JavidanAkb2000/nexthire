from django.urls import path
from .views import RegisterView

urlpatterns = [
    # Endpoint: /api/users/register/
    path('register/', RegisterView.as_view(), name='register'),
]