from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView  # Add this import
from .views import RegisterView

urlpatterns = [
    # Endpoint: /api/users/register/
    path('register/', RegisterView.as_view(), name='register'),
    
    # Endpoint: /api/users/login/  <-- SCRUM-23 is here!
    path('login/', TokenObtainPairView.as_view(), name='login'),
]