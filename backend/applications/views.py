from rest_framework import generics, permissions
from rest_framework.views import APIView       
from rest_framework.response import Response   
from .models import JobApplication, Reminder
from .serializers import JobApplicationSerializer, ReminderSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Reminder
from .serializers import ReminderSerializer

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
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    today = timezone.now()
    week_ago = today - timedelta(days=7)
    
    # Giriş yapan kullanıcının başvuruları
    user_apps = JobApplication.objects.filter(user=request.user)
    
    stats = {
        "total_applied": user_apps.count(),
        # Not: status isimlerinin models.py'deki choices ile birebir aynı olmasına dikkat et
        "total_offered": user_apps.filter(status='offer').count(), 
        "total_interviewed": user_apps.filter(status='interview').count(),
        "total_rejected": user_apps.filter(status='rejected').count(),
        
        "applied_this_week": user_apps.filter(created_at__gte=week_ago).count(),
        "offered_this_week": user_apps.filter(status='offer', created_at__gte=week_ago).count(),
        "interviewed_this_week": user_apps.filter(status='interview', created_at__gte=week_ago).count(),
        "rejected_this_week": user_apps.filter(status='rejected', created_at__gte=week_ago).count(),
    }
    return Response(stats)
# --------------------------------------------------------

# --- GÜNCELLENEN KISIM: Application Pipeline ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def application_pipeline(request):
    # Kullanıcının tüm başvurularını en yeniden eskiye doğru (-id) çek
    user_apps = JobApplication.objects.filter(user=request.user).order_by('-id')

    pipeline_data = {
        "applied": [],
        "screening": [],
        "interview": [],
        "offer": [],
        "rejected": []
    }

    today = timezone.now().date()

    for app in user_apps:
        # Statüyü kontrol et, eğer listede yoksa 'applied' kolonuna at
        status = app.status.lower() if app.status else 'applied'
        if status not in pipeline_data:
            status = 'applied'

        # İSTEĞİN ÜZERİNE EKLENDİ: Eğer bu kolonda zaten 4 tane kart varsa, 5.yi ekleme ve diğerine geç!
        if len(pipeline_data[status]) >= 4:
            continue

        # BURASI DÜZELDİ: Artık eski applied_date yerine yeni application_date kullanıyoruz!
        try:
            # application_date boşsa created_at kullan, o da yoksa bugünü baz al
            app_date = app.application_date or (app.created_at.date() if app.created_at else today)
            delta_days = (today - app_date).days
            
            if delta_days == 0:
                age_str = "Today"
            elif delta_days == 1:
                age_str = "1 day ago"
            elif delta_days > 1:
                age_str = f"{delta_days} days ago"
            else:
                age_str = "Future" # Eğer gelecekteki bir tarih seçilmişse
        except Exception as e:
            age_str = "Recently"

        # Sania'nın kart tasarımında beklediği formata göre veriyi hazırla
        pipeline_data[status].append({
            "id": app.id,
            "company": getattr(app, 'company_name', 'Unknown') or 'Unknown',
            "role": getattr(app, 'job_title', 'Unknown') or 'Unknown',
            "age": age_str
        })

    return Response(pipeline_data)
# ----------------------------------------------------
# ----------------------------------------------------

from django.db.models import Count
from django.db.models.functions import TruncDate

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def weekly_activity(request):
    today = timezone.now()
    week_ago = (today - timedelta(days=6)).date()
    
    # BURASI DÜZELDİ: created_at yerine application_date üzerinden gruplama yapıyoruz!
    activities = JobApplication.objects.filter(
        user=request.user,
        application_date__gte=week_ago
    ).annotate(
        date=TruncDate('application_date')
    ).values('date').annotate(
        count=Count('id')
    ).order_by('date')
    
    activity_dict = { (week_ago + timedelta(days=i)): 0 for i in range(7) }
    
    for act in activities:
        if act['date'] in activity_dict:
            activity_dict[act['date']] = act['count']
    
    chart_data = [ {"date": d.strftime('%Y-%m-%d'), "count": c} for d, c in activity_dict.items() ]
    
    return Response({
        "data": chart_data,
        "total_this_week": sum(activity_dict.values()),
        "change_percentage": 12 
    })
# -------------------------------------------------------------
# --- EKLENEN KISIM: 4. Görev - AI Resume Analyzer Sonucu ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def analyzer_last_result(request):
    # İleride burası gerçek AI modelinden veya veritabanından çekilecek.
    # Şimdilik Frontend'in (Sania'nın) hata vermeden çalışması ve 
    # tasarımı göstermesi için beklediği formatı dönüyoruz.
    data = {
        "match_score": 66,
        "missing_keywords": ["UX Research", "Figma", "User Journey"],
        "last_scan": "2 days ago"
    }
    
    # Eğer kullanıcının hiç analizi yoksa dönecek boş veri formatı:
    # data = { "match_score": None, "missing_keywords": [], "last_scan": None }
    
    return Response(data)
# -----------------------------------------------------------

# --- EKLENEN KISIM: 5. Görev - Dashboard Hatırlatıcılar Listesi ---
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_reminders(request):
    # Tamamlanmamış ve tarihi en yakın olan ilk 4 hatırlatıcıyı getir
    # Modeline göre is_completed veya done alanını kontrol et
    reminders = Reminder.objects.filter(
        user=request.user, 
        is_completed=False 
    ).order_by('due_date')[:4]
    
    serializer = ReminderSerializer(reminders, many=True)
    return Response(serializer.data)
# ---------------------------------------------------------------

# 1. Tüm Hatırlatıcıları Getir veya Yeni Ekle
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def reminders_list(request):
    if request.method == 'GET':
        reminders = Reminder.objects.filter(user=request.user).order_by('is_completed', 'due_date')
        serializer = ReminderSerializer(reminders, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        serializer = ReminderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 2. Hatırlatıcıyı Güncelle veya Sil
@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def reminder_detail(request, pk):
    try:
        reminder = Reminder.objects.get(pk=pk, user=request.user)
    except Reminder.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        serializer = ReminderSerializer(reminder, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        reminder.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)