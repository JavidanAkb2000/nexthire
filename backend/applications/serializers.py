from rest_framework import serializers
from .models import JobApplication

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__' # Tüm alanları JSON formatına çevir
        read_only_fields = ('user',) # Güvenlik: Kullanıcı id'sini dışarıdan değiştirtme