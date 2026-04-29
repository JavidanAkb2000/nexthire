from django.urls import path
from .views import AnalyzeResumeView, LastAnalysisView

urlpatterns = [
    path('analyze-resume/', AnalyzeResumeView.as_view(), name='analyze-resume'),
    path('last-analysis/', LastAnalysisView.as_view(), name='last-analysis'),
]