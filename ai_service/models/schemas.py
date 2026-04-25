from pydantic import BaseModel, Field, field_validator
from typing import List

class AnalyzeResponse(BaseModel):
    match_score: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="The match score. Must be between 0 and 100."
    )
    matched_keywords: List[str] = Field(default_factory=list)
    missing_keywords: List[str] = Field(default_factory=list)
    strengths: List[str] = Field(default_factory=list)
    improvements: List[str] = Field(default_factory=list)
    verdict: str = Field(..., min_length=1, max_length=50)

    @field_validator('match_score')
    @classmethod
    def normalize_score(cls, v: float) -> int:
        # If the LLM returns a decimal like 0.66 or 0.75, multiply by 100
        if 0.0 < v <= 1.0:
            return int(v * 100)
        # Otherwise, just ensure it's a clean integer (e.g., 60.0 becomes 60)
        return int(v)

if __name__ == "__main__":
    # 1. Your mocked Groq JSON output
    groq_output = {
        "match_score": 60,
        "matched_keywords": [
            "AI Engineer",
            "Python",
            "machine learning",
            "model optimization",
            "ML pipelines"
        ],
        "missing_keywords": [
            "LLMs",
            "RAG"
        ],
        "strengths": [
            "Results-driven AI Engineer with 4+ years of experience",
            "Skilled in building scalable ML pipelines",
            "Model optimization and real-world AI applications"
        ],
        "improvements": [
            "Lack of experience with LLMs and RAG",
            "No direct experience with AI system deployment mentioned in the job description"
        ],
        "verdict": "Partially Qualified"
    }

    # 2. Test the standard whole number output
    print("--- Test 1: Standard Integer Output ---")
    try:
        # This simulates FastAPI parsing the incoming JSON
        validated_response = AnalyzeResponse(**groq_output)
        print("✅ Validation Successful!")
        print(f"Final match_score for React: {validated_response.match_score} (Type: {type(validated_response.match_score).__name__})")
    except Exception as e:
        print(f"❌ Validation Failed: {e}")

    # 3. Test the LLM hallucinating a decimal (The 0.6 Trap)
    print("\n--- Test 2: The Decimal Trap (0.66) ---")
    groq_output_decimal = groq_output.copy()
    groq_output_decimal["match_score"] = 0.66  # Simulating a bad Groq response

    try:
        validated_decimal_response = AnalyzeResponse(**groq_output_decimal)
        print("✅ Validation Successful!")
        print(f"Groq Input: 0.66 -> Final match_score for React: {validated_decimal_response.match_score} (Type: {type(validated_decimal_response.match_score).__name__})")
    except Exception as e:
        print(f"❌ Validation Failed: {e}")