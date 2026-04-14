from django.db import models
from django.conf import settings

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interview', 'Interview'),
        ('screening', 'Screening'),
        ('offer', 'Offer'),
        ('rejected', 'Rejected'),
        ('saved', 'Saved'),
    ]

    # Her başvuru bir kullanıcıya aittir
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='applications'
    )
    
    company_name = models.CharField(max_length=255)
    job_title = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    application_date = models.DateField(auto_now_add=True)
    job_description_url = models.URLField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.job_title} at {self.company_name} ({self.user.username})"

    class Meta:
        ordering = ['-application_date']


class Reminder(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='reminders'
    )
    task = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    due_date = models.DateField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.task} for {self.company} ({self.user.username})"

    class Meta:
        ordering = ['is_completed', 'due_date']