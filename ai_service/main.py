from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyzer import router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="NextHire AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/health")
def health():
    return { "status": "running", "service": "NextHire AI" }