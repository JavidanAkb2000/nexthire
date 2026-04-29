import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import ResumeAnalysis

class AnalyzeResumeView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        resume_file = request.FILES.get('resume')
        job_description = request.data.get('job_description')

        # Validation
        if not resume_file:
            return Response({'error': 'Resume file is required'}, status=400)
        if not job_description:
            return Response({'error': 'Job description is required'}, status=400)
        if not resume_file.name.endswith('.pdf'):
            return Response({'error': 'Only PDF files accepted'}, status=400)

        # Forward to FastAPI
        try:
            files = {
                'resume': (
                    resume_file.name,
                    resume_file.read(),
                    'application/pdf'
                )
            }
            data = {'job_description': job_description}

            response = requests.post(
                'http://127.0.0.1:8001/api/analyze-resume/',
                files=files,
                data=data,
                timeout=30
            )

            if response.status_code != 200:
                return Response(
                    {'error': 'AI service failed'},
                    status=502
                )

            result = response.json()

            # Save to database
            ResumeAnalysis.objects.create(
                user=request.user,
                match_score=result['match_score'],
                matched_keywords=result['matched_keywords'],
                missing_keywords=result['missing_keywords'],
                strengths=result['strengths'],
                improvements=result['improvements'],
                verdict=result['verdict'],
            )

            return Response(result, status=200)

        except requests.exceptions.Timeout:
            return Response({'error': 'AI service timed out'}, status=504)
        except requests.exceptions.ConnectionError:
            return Response({'error': 'AI service is not running'}, status=503)
        except Exception as e:
            return Response({'error': str(e)}, status=500)


class LastAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        analysis = ResumeAnalysis.objects.filter(
            user=request.user
        ).first()

        if not analysis:
            return Response({
                'match_score': None,
                'missing_keywords': [],
                'last_scan': None
            })

        return Response({
            'match_score': analysis.match_score,
            'matched_keywords': analysis.matched_keywords,
            'missing_keywords': analysis.missing_keywords,
            'strengths': analysis.strengths,
            'improvements': analysis.improvements,
            'verdict': analysis.verdict,
            'last_scan': analysis.created_at,
        })