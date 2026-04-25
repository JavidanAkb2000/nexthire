from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services.pdf_parser import extract_text_from_pdf
from services.groq_client import analyze_with_groq
from models.schemas import AnalyzeResponse

router = APIRouter()

@router.post("/analyze-resume/", response_model=AnalyzeResponse)
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    # 1. Validate a file type
    if not resume.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files accepted")

    # 2. Extract text from PDF
    pdf_bytes = await resume.read()
    resume_text = extract_text_from_pdf(pdf_bytes)

    # Adding a length check to ensure the PDF wasn't just a blank page or an unreadable image
    if not resume_text or len(resume_text.strip()) < 50:
        raise HTTPException(status_code=400, detail="Could not extract sufficient text from PDF")

    # 3. Input Sanitization (Mətni təmizləmək üçün sadə filtr)
    # Çox uzun mətnlərin qarşısını almaq (Token limitini aşmamaq üçün)
    safe_resume_text = resume_text[:8000]

    # 4. Call Groq securely
    # Passing both arguments directly so groq_client can separate System and User roles
    try:
        result = analyze_with_groq(safe_resume_text, job_description)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")

    # 5. Return the result
    # FastAPI automatically pushes 'result' through your AnalyzeResponse Pydantic schema here.
    # If the LLM returned a decimal score (e.g., 0.66), Pydantic will instantly convert it
    # to the clean integer (66) before sending it to your frontend!
    return result