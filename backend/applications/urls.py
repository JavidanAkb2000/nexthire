from django.urls import path
from .views import (
    JobApplicationListCreateView, 
    JobApplicationDetailView,
    ReminderListCreateView,      
    ReminderDetailView,
    DashboardSummaryView,
    dashboard_stats,
    application_pipeline,
    weekly_activity,
    analyzer_last_result,
    dashboard_reminders,
    reminders_list,
    reminder_detail       
)

urlpatterns = [
    # Applications Endpoints
    path('', JobApplicationListCreateView.as_view(), name='application-list'),
    path('<int:pk>/', JobApplicationDetailView.as_view(), name='application-detail'),
    
    # Reminders Endpoints
    path('reminders/', ReminderListCreateView.as_view(), name='reminder-list'),
    path('reminders/<int:pk>/', ReminderDetailView.as_view(), name='reminder-detail'),

    # Dashboard İstatistikleri
    path('dashboard-summary/', DashboardSummaryView.as_view(), name='dashboard-summary'),

    path('dashboard/stats/', dashboard_stats, name='dashboard-stats'),

    path('applications/pipeline/', application_pipeline, name='application-pipeline'),

    path('dashboard/weekly-activity/', weekly_activity, name='weekly-activity'),

    path('analyzer/last-result/', analyzer_last_result, name='analyzer-last-result'),

    path('dashboard/reminders/', dashboard_reminders, name='dashboard-reminders'),

    path('api-reminders/', reminders_list, name='api-reminders-list'),
    path('api-reminders/<int:pk>/', reminder_detail, name='api-reminders-detail'),
]
