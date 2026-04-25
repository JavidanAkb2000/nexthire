import sys
import os
import json
import re
from typing import Optional, Dict, Any
from dotenv import load_dotenv
from groq import Groq

# Importing Modules
from prompt_builder import build_secure_messages
from pdf_parser import get_resume_content, PATH_TO_RESUME

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise EnvironmentError("GROQ_API_KEY not found, please check .env file.")

client = Groq(api_key=GROQ_API_KEY)


def analyze_with_groq(resume_text: str, job_description: str) -> Dict[str, Any]:
    """
    Requests to GROQ API securely using the prompt builder.
    """

    # 1. Get the securely formatted messages from our builder
    messages = build_secure_messages(resume_text, job_description)

    try:
        # 2. Pass the built messages directly to the API
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.1,
            max_tokens=2000,
            response_format={"type": "json_object"}
        )

        raw_output = response.choices[0].message.content.strip()

        # 3. JSON cleansing fallback
        clean_json = re.search(r"(\{.*\})", raw_output, re.DOTALL)
        if clean_json:
            return json.loads(clean_json.group(1))

        return json.loads(raw_output)

    except json.JSONDecodeError:
        return {"error": "Model returned irregular JSON format"}
    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}


if __name__ == "__main__":
    if not os.path.exists(PATH_TO_RESUME):
        print(f"Error: Couldn't find a file: {PATH_TO_RESUME}")
        sys.exit(1)

    content = get_resume_content(PATH_TO_RESUME)

    if not content or len(content.strip()) < 50:
        print("Error: Resume content is so less, could not be read.")
        sys.exit(1)

    jd = "AI Engineer - focus on Python, LLMs, and RAG"

    # Analyze
    result = analyze_with_groq(content, jd)

    print(json.dumps(result, indent=4, ensure_ascii=False))