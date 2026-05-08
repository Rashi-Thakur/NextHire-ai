# API Documentation

Base URL: `http://localhost:5000/api`

## Auth

### `POST /auth/register`
Create account.
```json
{
  "name": "Rashi",
  "email": "rashi@example.com",
  "password": "secret123"
}
```

### `POST /auth/login`
Login user.
```json
{
  "email": "rashi@example.com",
  "password": "secret123"
}
```

### `GET /users/me`
Protected route, returns current user.
Header: `Authorization: Bearer <token>`

## Analysis

### `POST /analysis/extract`
Protected route for resume PDF text extraction.
- Content-Type: `multipart/form-data`
- field name: `resume`

Response:
```json
{
  "success": true,
  "resumeText": "..."
}
```

### `POST /analysis`
Protected route to run ATS + AI analysis.
```json
{
  "resumeText": "...",
  "jobDescription": "..."
}
```

Response includes:
- `atsScores`
- `missingSkills`
- `matchedSkills`
- `suggestedKeywords`
- `strengths` / `weaknesses`
- `aiFeedback`
- `topJobRoles`

### `GET /analysis`
Protected route, gets logged-in user's analysis history.

### `GET /analysis/:id`
Protected route, returns a single analysis by id.
