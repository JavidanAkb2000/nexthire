from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import JobApplication, Reminder

User = get_user_model()

class NextHireAPITests(APITestCase):
    
    def setUp(self):
        """
        Bu fonksiyon her testten ÖNCE bir kez çalışır.
        Sistemde sahte bir kullanıcı oluşturur ve ona 'giriş yapılmış' yetkisi verir.
        """
        self.user = User.objects.create_user(
            email='test@nexthire.com', 
            username='testuser', 
            password='strongpassword123'
        )
        # Test robotumuza "Sen bu kullanıcısın" diyoruz
        self.client.force_authenticate(user=self.user)

        # Adreslerimizi değişkenlere atıyoruz
        self.application_url = '/api/applications/'
        self.reminder_url = '/api/applications/reminders/'
        self.dashboard_url = '/api/applications/dashboard-summary/'

    def test_create_job_application(self):
        """İş başvurusu ekleme kapısının (POST) doğru çalışıp çalışmadığını test eder."""
        data = {
            "company_name": "Tesla",
            "job_title": "Backend Engineer",
            "status": "applied"
        }
        response = self.client.post(self.application_url, data)
        
        # 1. Beklenen sonuç 201 Created mı?
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # 2. Veritabanına gerçekten kaydedildi mi?
        self.assertEqual(JobApplication.objects.count(), 1)
        # 3. Kaydedilen veri doğru mu?
        self.assertEqual(JobApplication.objects.get().company_name, 'Tesla')

    def test_create_reminder(self):
        """Hatırlatıcı ekleme kapısının (POST) doğru çalışıp çalışmadığını test eder."""
        data = {
            "task": "Send portfolio",
            "company": "Tesla",
        }
        response = self.client.post(self.reminder_url, data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Reminder.objects.count(), 1)

    def test_dashboard_summary_returns_correct_stats(self):
        """Dashboard istatistik kapısının (GET) doğru hesaplama yapıp yapmadığını test eder."""
        # Önce veritabanına sahte bir başvuru ekleyelim
        JobApplication.objects.create(
            user=self.user, 
            company_name="Google", 
            job_title="Dev", 
            status="applied"
        )
        
        # Şimdi istatistikleri çekelim
        response = self.client.get(self.dashboard_url)
        
        # 1. Sayfa başarıyla açıldı mı (200 OK)?
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # 2. Paketin içinde 'stats' verisi var mı?
        self.assertIn('stats', response.data)
        # 3. 'total_applied' sayısı 1 olarak geldi mi?
        self.assertEqual(response.data['stats']['total_applied'], 1)

    def test_unauthorized_access_is_blocked(self):
        """Giriş yapmamış birinin (hackleyenin) sisteme erişip erişemediğini test eder."""
        # Robotun giriş (authentication) kimliğini siliyoruz
        self.client.force_authenticate(user=None)
        
        response = self.client.get(self.application_url)
        
        # Beklenen sonuç: 401 Unauthorized (İzinsiz Giriş) hatası vermeli!
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)