# AI Resume Analyzer + Job Matcher

Production-style full-stack project for internship/fresher portfolio:
- Upload resume PDF
- Parse text automatically
- Compare with Job Description
- Calculate ATS scores
- Detect missing skills and keywords
- Generate AI suggestions
- Save history with auth
- Download analysis report PDF

## Phase 1: Architecture and Setup

### Architecture
- `client` (React + Tailwind + Framer Motion): UI, dashboard, charts, auth screens, upload + analysis flow
- `server` (Node + Express + MongoDB): auth APIs, PDF parsing, ATS scoring, AI feedback, history persistence
- MongoDB: stores users and all analysis reports

### Folder Structure
```text
nexthire-ai/
  client/
    src/
      components/
      context/
      hooks/
      pages/
      services/
      utils/
      App.jsx
      main.jsx
      index.css
    package.json
    .env.example
    tailwind.config.js
    postcss.config.js
    vite.config.js
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      utils/
      app.js
      server.js
    package.json
    .env.example
  README.md
  API_DOCUMENTATION.md
  DEPLOYMENT_GUIDE.md
  INTERVIEW_GUIDE.md
```

### Installation Commands
```bash
# 1) go to project root
cd nexthire-ai

# 2) install backend dependencies
cd server
npm install

# 3) install frontend dependencies
cd ../client
npm install
```

### Environment Setup
```bash
# backend
cp server/.env.example server/.env

# frontend
cp client/.env.example client/.env
```

Update:
- `server/.env` -> `MONGO_URI`, `JWT_SECRET`, `OPENAI_API_KEY`
- `client/.env` -> `VITE_API_BASE_URL=http://localhost:5000/api`

### Run Locally
```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

Open `http://localhost:5173`.

## Phase 2: Backend Setup (Done)
- JWT auth (register/login/profile)
- PDF extraction API using `pdf-parse`
- ATS scoring engine (technical, soft, compatibility, formatting, readability)
- AI feedback service (OpenAI + fallback)
- History persistence in MongoDB
- Protected routes with middleware
- Security middleware (`helmet`, CORS, rate limiting)

## Phase 3: Frontend Setup (Done)
- Landing, Login, Register
- Dashboard
- Resume Upload + JD input
- Analysis page with charts and score cards
- History and Profile pages
- Dark/light mode
- Drag-and-drop PDF upload
- PDF report export
- Reusable components and contexts

## Phase 4: AI Integration (Done)
- Endpoint: `POST /api/analysis`
- Calls AI service after ATS scoring
- Returns:
  - improvement suggestions
  - rewritten bullets
  - better projects/certifications
  - stronger action verbs

## Phase 5: ATS Scoring Engine (Done)
Weighted scoring includes:
- Skill match
- Soft-skill match
- Education/project/action keyword coverage
- Readability score
- Formatting score
- Keyword density

Outputs:
- Overall score
- Technical score
- Soft skill score
- ATS compatibility score
- Missing and matched skills
- Suggested keywords

## Phase 6: Deployment
See `DEPLOYMENT_GUIDE.md`.

## Common Errors and Fixes
- `MONGO_URI missing`: set `server/.env` correctly
- `401 Unauthorized`: login again, token expired/removed
- `Only PDF files are allowed`: upload `.pdf` only
- CORS issue: ensure `CLIENT_URL` in backend matches frontend URL
- OpenAI failure: app uses fallback AI suggestions automatically

## Security Best Practices Implemented
- Password hashing with bcrypt
- JWT-based protected endpoints
- Rate limiting for API routes
- Helmet secure headers
- Input validation + centralized error handler

## Project Resume Description
Built a full-stack **AI Resume Analyzer + Job Matcher** with React, Node.js, Express, MongoDB, and OpenAI. Implemented PDF resume parsing, ATS scoring algorithm, missing-skill detection, AI-based feedback generation, JWT authentication, analysis history tracking, chart visualizations, dark mode UI, and downloadable PDF reports.
