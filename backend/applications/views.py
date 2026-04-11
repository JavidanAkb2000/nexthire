from rest_framework import generics, permissions
from .models import JobApplication
from .serializers import JobApplicationSerializer

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