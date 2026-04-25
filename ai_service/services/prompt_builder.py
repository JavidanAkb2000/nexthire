import sys
import json
from pdf_parser import extract_text_from_pdf, get_resume_content, PATH_TO_RESUME

def build_secure_messages(resume_text: str, job_description: str) -> list:
    # 1. Clean the content
    clean_resume = resume_text.strip()

    # 2. Limit chars
    max_chars = 10000
    if len(clean_resume) > max_chars:
        clean_resume = clean_resume[:max_chars] + "... [cropped]"

    # 3. SECURE SEPARATION: System holds the rules, User holds the data.
    system_prompt = """You are a professional HR Data Analyst.
        Analyze the following resume strictly against the provided job description.
        
        Your response must be a SINGLE VALID JSON object. 
        Do not include any preamble, markdown code blocks (like ```json), or postscript.
        
        Required JSON Structure:
        {
          "match_score": 0-100 (integer),
          "matched_keywords": [],
          "missing_keywords": [],
          "strengths": [],
          "improvements": [],
          "verdict": ""
}"""

    user_prompt = f"""JOB DESCRIPTION:
            {job_description}
            
            ---
            RESUME CONTENT:
            {clean_resume}
---"""

    # Return the exact format the Groq API expects
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

if __name__ == "__main__":
    content = get_resume_content(PATH_TO_RESUME)
    if not content:
        print("Error: Resume content is empty.")
        sys.exit(1)

    jd = "AI Engineer - focus on Python, LLMs, and RAG"
    messages = build_secure_messages(content, jd)
    print(json.dumps(messages, indent=2))