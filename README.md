# NextHire 🚀
Smart Job Application Tracker + AI Resume Analyzer
Link to video - https://www.youtube.com/watch?v=2_amtOEWLSk

> Developed at **Vizja University** — Full-Code Development Track · March–June 2026

---

## 📌 Overview

NextHire is a full-stack web application that helps job seekers organize, track, and improve their job application process.

Instead of managing applications manually, users can store all their applications in one place, monitor their progress through different hiring stages, gain insights into their job search performance, and use an AI-powered Resume Analyzer to get a match score, missing keywords, and actionable improvement suggestions against any job description.

---

## 🎯 Problem Statement

Job seekers often:
- Lose track of applications
- Forget to follow up
- Don't understand why they get rejected
- Struggle to tailor resumes for each job

NextHire solves these problems by combining tracking, analytics, and AI feedback into one system.

---

## 🏗️ System Architecture

NextHire is a **three-tier architecture** with three independently running servers communicating via REST APIs.

| Layer | Technology | Port | Responsibility |
|---|---|---|---|
| Frontend | React.js + Vite + Tailwind CSS | 5173 | UI, state management, API calls |
| Backend | Django REST Framework + MySQL | 8000 | Business logic, auth, CRUD, DB, proxy to AI |
| AI Service | FastAPI + Groq API (LLaMA 3.3 70B) | 8001 | PDF parsing, prompt engineering, LLM inference |

### Request Flow

```
Standard:      React (5173) → Django (8000) → MySQL
AI Analyzer:   React (5173) → Django (8000) → FastAPI (8001) → Groq LLM API
                                                              ↓
               React ← Django (saves to DB) ← FastAPI ←──────┘
```

> The React frontend **never** communicates directly with the database or AI service — everything routes through Django as the central security layer.

---

## ⚙️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | Component-based UI for the single-page application |
| Vite | Build tool and development server |
| Tailwind CSS | Utility-first CSS for all UI components |
| Axios | HTTP client for React → Django API calls |
| Recharts | Chart library for analytics visualizations |
| React Router | Client-side routing without full page reloads |

### Backend
| Technology | Purpose |
|---|---|
| Python 3.12 | Primary programming language |
| Django 5.x | Main API server framework |
| Django REST Framework | RESTful API toolkit |
| djangorestframework-simplejwt | JWT token generation and validation |
| django-cors-headers | Cross-Origin Resource Sharing between React and Django |
| mysqlclient | MySQL adapter for Django |

### AI Service
| Technology | Purpose |
|---|---|
| FastAPI | Async Python framework for the AI microservice |
| Uvicorn | ASGI server to run FastAPI |
| Groq SDK | Official Groq client to call LLaMA 3.3 70B |
| PyPDF2 | PDF text extraction from uploaded resumes |
| Pydantic | Data validation for API request/response schemas |
| python-dotenv | Loads `GROQ_API_KEY` from `.env` |

### Database & Tools
| Technology | Purpose |
|---|---|
| MySQL | Relational database (`nexthire_db`) |
| Figma | UI/UX wireframes and design system |
| GitHub | Version control with branch protection on `main` |
| Jira | Agile project management — 7 sprints |
| uv | Ultra-fast Python package manager (replaces pip) |

---

## ✨ Core Features

### Job Application Tracking
- Add, edit, delete applications
- Store company, role, salary, applied date, and notes
- Track status: `Applied → Screening → Interview → Offer → Rejected`

### Pipeline Board
Visual kanban-style board showing all applications grouped by hiring stage.

### AI Resume Analyzer
- Upload resume as PDF
- Paste a job description
- Get back:
  - **Match score** (0–100%)
  - **Matched keywords** found in both resume and JD
  - **Missing keywords** important to the role
  - **Resume strengths** relevant to the job
  - **Improvement suggestions** — specific and actionable
  - **Verdict** — Strong Match / Good Match / etc.

### Analytics Dashboard
- Weekly application activity
- Status breakdown and offer rate
- Pipeline funnel
- Salary comparison insights

### Reminders
- Set follow-up dates per application
- Mark reminders as done
- Dashboard widget showing upcoming reminders

### Search & Filter
- Filter applications by status, company, or role

---

## 🗄️ Database Structure

Database name: `nexthire_db`

### `users_user`
Custom user model using **email** as the login field.

| Column | Type | Description |
|---|---|---|
| id | INT PK | Auto-incremented primary key |
| email | VARCHAR(254) UQ | Unique email — used for login |
| username | VARCHAR(150) | Display name |
| password | VARCHAR(128) | Hashed password (PBKDF2 + SHA-256) |
| is_active | BOOLEAN | Account active status |
| date_joined | DATETIME | Registration timestamp |

### `applications_jobapplication`
Core table — every application belongs to one user.

| Column | Type | Description |
|---|---|---|
| id | INT PK | Primary key |
| user_id | INT FK | Foreign key to `users_user` |
| company | VARCHAR(255) | Company name |
| role | VARCHAR(255) | Job title applied for |
| status | VARCHAR(50) | applied / screening / interview / offer / rejected |
| salary | VARCHAR(100) | Expected or offered salary |
| applied_date | DATE | Date application was submitted |
| notes | TEXT | Free-text notes |
| created_at | DATETIME | Record creation timestamp |

### `applications_reminder`
Follow-up reminders linked to applications.

| Column | Type | Description |
|---|---|---|
| id | INT PK | Primary key |
| user_id | INT FK | Foreign key to `users_user` |
| application_id | INT FK | Foreign key to `applications_jobapplication` |
| message | TEXT | Reminder message / action |
| due_date | DATE | When the reminder is due |
| is_done | BOOLEAN | Completion status |
| created_at | DATETIME | Creation timestamp |

### `analyzer_resumeanalysis`
Stores AI analysis results per user.

| Column | Type | Description |
|---|---|---|
| id | INT PK | Primary key |
| user_id | INT FK | Foreign key to `users_user` |
| match_score | FLOAT | AI match percentage (0.0–100.0) |
| matched_keywords | JSON | Keywords found in both resume and JD |
| missing_keywords | JSON | Important JD keywords missing from resume |
| strengths | JSON | Resume strengths relevant to the job |
| improvements | JSON | Actionable improvement suggestions |
| verdict | VARCHAR | Strong Match / Good Match / etc. |
| created_at | DATETIME | Timestamp of analysis |

---

## 🔌 API Endpoints

All endpoints except `/api/auth/register/` and `/api/auth/login/` require:
```
Authorization: Bearer <access_token>
```

### Authentication
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register/` | No | Register new user. Body: `email, username, password` |
| POST | `/api/auth/login/` | No | Login. Returns JWT access + refresh tokens |
| POST | `/api/auth/token/refresh/` | No | Refresh expired access token |

### Job Applications
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/applications/` | Yes | List all applications for authenticated user |
| POST | `/api/applications/` | Yes | Create a new application |
| GET | `/api/applications/{id}/` | Yes | Get a single application |
| PUT | `/api/applications/{id}/` | Yes | Update an application |
| DELETE | `/api/applications/{id}/` | Yes | Delete an application |
| GET | `/api/applications/pipeline/` | Yes | All applications grouped by status |

### Dashboard & Analytics
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/dashboard/stats/` | Yes | Totals: applied, offered, interviewed, rejected + weekly deltas |
| GET | `/api/dashboard/weekly-activity/` | Yes | Daily application counts for the past 7 days |

### Reminders
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/reminders/` | Yes | List all reminders |
| POST | `/api/reminders/` | Yes | Create reminder. Body: `message, due_date, application_id` |
| PUT | `/api/reminders/{id}/` | Yes | Update reminder (e.g. mark as done) |
| DELETE | `/api/reminders/{id}/` | Yes | Delete a reminder |

### AI Resume Analyzer
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/analyzer/analyze-resume/` | Yes | Upload PDF + job description → returns AI analysis |
| GET | `/api/analyzer/last-analysis/` | Yes | Returns most recent analysis for authenticated user |

---

## 🤖 AI Service — How It Works

The AI microservice runs as an independent FastAPI server on port **8001**, completely isolated from Django.

```
ai_service/
├── main.py               # FastAPI app entry point, CORS config
├── routes/
│   └── analyzer.py       # POST /api/analyze-resume/
├── services/
│   ├── pdf_parser.py     # Extracts text from PDF using PyPDF2
│   ├── prompt_builder.py # Builds structured prompt for Groq
│   └── groq_client.py    # Calls Groq API, parses JSON response
├── models/
│   └── schemas.py        # Pydantic request/response models
├── .env                  # GROQ_API_KEY (never committed)
└── pyproject.toml        # uv-managed dependencies
```

**Step-by-step flow:**
1. React sends PDF + job description to Django `/api/analyzer/analyze-resume/`
2. Django validates JWT, identifies user, forwards to FastAPI at port 8001
3. `pdf_parser.py` extracts resume text using PyPDF2
4. `prompt_builder.py` constructs a structured prompt instructing the LLM to return strict JSON
5. `groq_client.py` sends the prompt to Groq (LLaMA 3.3 70B, temperature 0.3)
6. Groq returns the JSON analysis object
7. Pydantic validates the response against `AnalyzeResponse` schema
8. FastAPI returns result to Django → Django saves to `analyzer_resumeanalysis` table
9. Django returns result to React → Analyzer page displays the full analysis

**Example AI response:**
```json
{
  "match_score": 87,
  "matched_keywords": ["Python", "Machine Learning", "FastAPI", "REST API"],
  "missing_keywords": ["Kubernetes", "Docker", "CI/CD"],
  "strengths": [
    "Strong experience in ML pipeline development",
    "Proficient in Python and REST API design"
  ],
  "improvements": [
    "Add containerization experience (Docker/Kubernetes)",
    "Quantify ML model performance improvements with metrics"
  ],
  "verdict": "Strong Match"
}
```

---

## 🚀 Installation & Running the Project

**Prerequisites:** Node.js 18+, Python 3.12, MySQL 8+, `uv` package manager, Git

Make sure MySQL is running and a database named `nexthire_db` exists before starting.

### Step 1 — Clone the Repository
```bash
git clone https://github.com/JavidanAkb2000/nexthire.git
cd nexthire
```

### Step 2 — Configure Environment Variables

Create `ai_service/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
```

Create `backend/.env`:
```env
DB_NAME=nexthire_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
SECRET_KEY=your_django_secret_key
```

### Step 3 — Run the Frontend
```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

### Step 4 — Run the AI Service
```bash
cd ai_service
uv run uvicorn main:app --reload --port 8001
# Runs at http://localhost:8001
# API docs at http://localhost:8001/docs
```

### Step 5 — Run the Django Backend
```bash
cd backend
uv run python manage.py migrate
uv run python manage.py runserver
# Runs at http://localhost:8000
```

> ⚠️ **All three servers must be running simultaneously.** Open three separate terminal windows — one for each.

---

## 🔐 Security & Authentication

| Area | Implementation |
|---|---|
| JWT Authentication | All protected endpoints require a valid Bearer token. Issued by `djangorestframework-simplejwt`. Access tokens expire and are refreshed via the refresh token. |
| User Data Isolation | Every DB query is filtered by `request.user` — users can only ever access their own data. |
| Custom User Model | Email-based login using `AbstractUser`. Passwords hashed with PBKDF2 + SHA-256. |
| CORS Protection | `django-cors-headers` restricts requests to trusted origins only (React at `localhost:5173`). |
| Environment Variables | Secrets (`DB credentials`, `SECRET_KEY`, `GROQ_API_KEY`) stored in `.env` files excluded from version control via `.gitignore`. |
| Branch Protection | `main` branch is protected — all changes require a Pull Request reviewed by the Project Lead. |

---

## 👤 User Flow

1. User registers or logs in → receives JWT tokens
2. Adds job applications via the Applications page
3. Updates application status as it progresses through the pipeline
4. Uploads resume PDF + job description to the AI Analyzer
5. Reviews match score, missing keywords, and improvement suggestions
6. Monitors performance via the Analytics dashboard
7. Sets and manages follow-up reminders

---

## 📁 Project Structure

```
nexthire/
├── frontend/      # React.js application
├── backend/       # Django REST Framework API
├── ai_service/    # FastAPI AI resume analyzer microservice
└── docs/          # Documentation and notes
```

---

## 👥 Team

| Name | Role | Key Contributions |
|---|---|---|
| Javidan Akbarov | Project Lead & AI Engineer | FastAPI AI microservice, PDF extraction, Groq LLM integration, prompt engineering |
| Kadir Cikilmazkaya | Backend Developer & Database | Django REST Framework backend, MySQL schema design, JWT auth |
| Sania Sohail | Frontend Developer | All React pages: Login, Dashboard, Applications, AI Analyzer, Analytics, Reminders |
| Tsevelmaa Yeruult | UI/UX Designer & Documentation | Figma design system, color palette, typography, full technical documentation |

---

## 🗓️ Development Workflow

This project follows **Scrum methodology** with 7 sprints in bi-weekly cycles.

- **Version Control:** GitHub with branch protection on `main`
- **Project Management:** Jira — backlog, sprints, story point tracking
- **Duration:** 12 weeks — March to June 2026

---

## 📋 Planned Features (from Jira Backlog)

- [x] Project setup (repository, structure, environment)
- [x] UI/UX design in Figma
- [x] Authentication system (login/register + JWT)
- [x] CRUD operations for job applications
- [x] Dashboard and analytics components
- [x] AI resume analysis endpoint
- [x] Frontend ↔ Backend ↔ AI service integration
- [ ] Testing & deployment

---

## Project Information

| Field | Details |
|---|---|
| Institution | Vizja University |
| Course Track | Full-Code Development Track |
| Duration | 12 Weeks — March to June 2026 |
| Methodology | Agile / Scrum — 7 sprints |
| Version Control | GitHub (branch protection on main) |
| Project Manager | Javidan Akbarov |
| Document Version | v1.0 — April 2026 |

---

# All rights reserved · NextHire · Vizja University · 2026
