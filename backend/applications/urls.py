from django.urls import path
from .views import (
    JobApplicationListCreateView, 
    JobApplicationDetailView,
    ReminderListCreateView,      # Yeni ekledik
    ReminderDetailView           # Yeni ekledik
)

urlpatterns = [
    # Applications Endpoints
    path('', JobApplicationListCreateView.as_view(), name='application-list'),
    path('<int:pk>/', JobApplicationDetailView.as_view(), name='application-detail'),
    
    # Reminders Endpoints
    path('reminders/', ReminderListCreateView.as_view(), name='reminder-list'),
    path('reminders/<int:pk>/', ReminderDetailView.as_view(), name='reminder-detail'),
]