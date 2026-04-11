from django.urls import path
from .views import JobApplicationListCreateView, JobApplicationDetailView

urlpatterns = [
    # Hem listeleme hem de yeni başvuru ekleme adresi
    path('', JobApplicationListCreateView.as_view(), name='application-list'),
    # Tek bir başvuruyu görme, silme veya güncelleme adresi (id'ye göre)
    path('<int:pk>/', JobApplicationDetailView.as_view(), name='application-detail'),
]