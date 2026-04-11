from rest_framework import serializers
from .models import JobApplication, Reminder

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__' # Tüm alanları JSON formatına çevir
        read_only_fields = ('user',) # Güvenlik: Kullanıcı id'sini dışarıdan değiştirtme


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = '__all__'
        read_only_fields = ('user',)