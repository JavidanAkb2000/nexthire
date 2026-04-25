from django.db import models
from django.conf import settings

class ResumeAnalysis(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='analyzer'
    )
    match_score = models.FloatField()
    matched_keywords = models.JSONField(default=list)
    missing_keywords = models.JSONField(default=list)
    strengths = models.JSONField(default=list)
    improvements = models.JSONField(default=list)
    verdict = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} - {self.match_score} - {self.created_at}"