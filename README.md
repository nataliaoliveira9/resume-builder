# PDF Resume Generator

A minimalist, editorial-style resume generator built with Node.js and Puppeteer.

## Features
- **Bilingual Support:** English (EN-US) and Brazilian Portuguese (PT-BR).
- **Template Selection:** "Modern" (accented, sans-serif) and "Classic" (monochromatic, serif).
- **ATS Compatible:** Single-column layout with selectable text.
- **Auto-save:** Drafts are saved to `localStorage`.
- **Validation:** Real-time frontend validation and server-side safety checks.

## Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript.
- **Backend:** Node.js, Express.js.
- **PDF Generation:** Puppeteer (chosen for high styling fidelity and ATS compatibility).

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file (see `.env.example`).
3. Run in development mode:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm start
   ```

## API
### POST `/api/resume/generate`
Generates a PDF from JSON data.
**Body:**
```json
{
  "personal": { "fullName": "...", "email": "...", "phone": "...", "cityState": "..." },
  "objective": "...",
  "skills": ["..."],
  "experience": [{ "company": "...", "role": "...", "start": "...", "end": "...", "current": false, "desc": "..." }],
  "education": [{ "course": "...", "institution": "...", "start": "...", "end": "...", "progress": false }],
  "language": "en|pt",
  "template": "modern|classic"
}
```
