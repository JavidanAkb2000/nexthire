import sys
import json
from pdf_parser import extract_text_from_pdf, get_resume_content, PATH_TO_RESUME


def build_analysis_prompt(resume_text: str, job_description: str) -> str:
    # 1. Security: We clean the content (unnecessary spaces etc.)
    clean_resume = resume_text.strip()

    # 2. Limit: To not hit the LLM limit (e.g, max 10.000 symbol)
    max_chars = 10000
    if len(clean_resume) > max_chars:
        clean_resume = clean_resume[:max_chars] + "... [cropped]"

    # 3. Structure: Giving a JSON example much cleaner
    # Using delimiters in Prompt to separate "Resume Text" part e.g. '----'
    return f"""You are a professional HR Data Analyst.
            Analyze the following resume strictly against the provided job description.
            
            JOB DESCRIPTION:
            {job_description}
            
            ---
            RESUME CONTENT:
            {clean_resume}
            ---
            
            Your response must be a SINGLE VALID JSON object. 
            Do not include any preamble, markdown code blocks (like ```json), or postscript.
            
            Required JSON Structure:
            {{
              "match_score": 0,
              "matched_keywords": [],
              "missing_keywords": [],
              "strengths": [],
              "improvements": [],
              "verdict": ""
            }}
"""


if __name__ == "__main__":
    content = get_resume_content(PATH_TO_RESUME)

    if not content:
        print("Error: Resume content is empty and couldn't be read.")
        sys.exit(1)

    jd = "AI Engineer - focus on Python, LLMs, and RAG"
    prompt = build_analysis_prompt(content, jd)

    # All set
    print(prompt)
