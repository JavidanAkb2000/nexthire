from rest_framework import generics, permissions
from rest_framework.views import APIView       
from rest_framework.response import Response   
from .models import JobApplication, Reminder
from .serializers import JobApplicationSerializer, ReminderSerializer

class JobApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Güvenlik: Sadece giriş yapmış olan kullanıcının başvurularını listele
        return JobApplication.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Kayıt esnasında: Başvurunun kime ait olduğunu (user) sistemden otomatik al
        serializer.save(user=self.request.user)

class JobApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Güvenlik: Kullanıcı sadece kendi başvurusunu detaylandırabilir, silebilir veya güncelleyebilir
        return JobApplication.objects.filter(user=self.request.user)
    


class ReminderListCreateView(generics.ListCreateAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Sadece giriş yapan kullanıcının hatırlatıcılarını getir
        return Reminder.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Hatırlatıcıyı oluşturan kişiyi otomatik olarak kaydet
        serializer.save(user=self.request.user)

class ReminderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Sadece kullanıcının kendi hatırlatıcısına müdahale etmesine izin ver
        return Reminder.objects.filter(user=self.request.user)
    

class DashboardSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # 1. Kullanıcının tüm başvurularını al
        applications = JobApplication.objects.filter(user=user)
        
        # 2. İstatistikleri hesapla
        stats = {
            "total_applied": applications.count(),
            "total_offered": applications.filter(status='offered').count(),
            "total_interviewed": applications.filter(status__in=['screening', 'interviewing']).count(),
            "total_rejected": applications.filter(status='rejected').count(),
        }

        # 3. Yaklaşan ilk 4 hatırlatıcıyı getir (Tamamlanmamış olanlar)
        upcoming_reminders = Reminder.objects.filter(
            user=user, 
            is_completed=False
        ).order_by('due_date')[:4]
        
        # Hatırlatıcıları JSON formatına çevir
        reminders_data = ReminderSerializer(upcoming_reminders, many=True).data

        # 4. Hepsini tek bir paket olarak gönder
        return Response({
            "stats": stats,
            "upcoming_reminders": reminders_data
        })