# 🤖 AI-Powered Resume Builder

> An intelligent, full-stack resume builder that combines a real AI agent with ATS analysis — helping job seekers craft optimized, job-specific resumes that get past automated filters and land interviews.

---

## 📸 Screenshots

### 🏠 Landing Page
![f9a5f70c-ab99-43bf-9959-2d79fc37bf3d](https://github.com/user-attachments/assets/8c636141-e73b-4525-8391-627c16b0f753)


### 🔐 Login / Authentication
![e931f8d8-d95a-4d03-9dc4-a33ae18bfda5](https://github.com/user-attachments/assets/a7488074-c44c-4fba-9636-ef4917c18686)


### 🎯 Home Dashboard
![597480cb-8344-4d14-8316-fd275e4caaf5](https://github.com/user-attachments/assets/8db473d4-1be2-4e85-ba63-d1dc5f2baa15)


### ➕ Create New Resume (Template Picker)
![9eb810e3-c8c1-4c94-a451-2e7d74172504](https://github.com/user-attachments/assets/89a9fabb-1775-4303-92ce-a5a6c0b16099)


### ✏️ Resume Editor
![e60c33bd-ff98-4fb7-a2af-2799f5f61637](https://github.com/user-attachments/assets/cacfb78f-ff7e-40c9-bc40-8448fa9fa527)

### 📤 Upload Existing Resume
![1f46abdf-314c-46bc-9d85-b57b1c8f0794](https://github.com/user-attachments/assets/ea77efe5-08a7-4451-a6bf-09069a07d43d)

### 🤖 AI-Parsed Resume Result
![94cb5fe8-c7cf-4480-bc59-387e1c324af4](https://github.com/user-attachments/assets/ff5c8406-3adf-4c82-9420-a752131da36c)


### 📋 My Resumes Dashboard
![0067cc7d-ca3d-4c37-a6ca-06a7798dec13](https://github.com/user-attachments/assets/e0322684-e12b-4b2f-9b5e-0d0134f5ec42)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Architecture](#architecture)
- [How It Works](#how-it-works)

---

## Overview

Over **90% of Fortune 500 companies** use an ATS (Applicant Tracking System) to automatically scan and filter resumes before any human reads them. Even the best-written resume fails if it's not ATS-optimised.

This project solves that problem by combining:

- A **real AI agent** (using LangChain function calling) that chats with you and autonomously updates your resume
- A **hybrid ATS scoring engine** (algorithmic + AI) that grades your resume against any job description
- **STAR-method bullet generation** that transforms raw experience descriptions into recruiter-ready bullet points
- **5 professional templates** and a full section editor with live preview

---

## ✨ Features

| Feature | Description |
|---|---|
| **Resume CRUD** | Create, read, update, and delete resumes with multiple sections |
| **PDF Upload & Parsing** | Upload existing PDF resumes and extract structured data using AI |
| **5 Professional Templates** | Classic Professional, Modern Tech, Creative Bold, Minimal Clean, Executive |
| **AI Interview Agent** | Real AI agent using LangChain function calling — autonomously updates resume sections during conversation |
| **STAR Bullet Generation** | AI transforms raw experience into optimised bullet points |
| **ATS Scoring (10 Metrics)** | Hybrid algorithmic + AI scoring against job descriptions |
| **Resume Review** | AI provides comprehensive feedback as a senior career counsellor |
| **Version Management** | Save, restore, and compare resume snapshots |
| **Google OAuth + JWT Auth** | Secure login via Google or email/password |

---

## 🛠 Tech Stack

### Frontend
- **React.js** — UI framework
- **Vite** — Build tool & dev server
- **React Router** — Client-side routing
- **Google OAuth** — Authentication

### Backend
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — Database & ODM
- **JWT** — Token-based auth
- **Multer** — File upload handling
- **pdfjs-dist** — PDF text extraction

### AI & Agents
- **Google Gemini 2.5 Flash** — Core language model
- **LangChain JS** — Agent framework (`@langchain/langgraph`, `@langchain/google-genai`)
- **Zod** — Tool schema validation for function calling

---

## 📁 Project Structure

```
project/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── gemini.config.js       # Gemini API integration
│   │   │   └── agent.tools.js         # LangChain tool definitions
│   │   ├── constants/
│   │   │   └── prompts.js             # All AI prompt templates
│   │   ├── controllers/
│   │   │   ├── resume.controller.js
│   │   │   ├── ai.controller.js
│   │   │   └── version.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── upload.middleware.js   # Multer PDF upload
│   │   ├── models/
│   │   │   ├── Resume.model.js
│   │   │   ├── ChatHistory.model.js
│   │   │   └── ResumeVersion.model.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── resume.routes.js
│   │   │   ├── ai.routes.js
│   │   │   └── version.routes.js
│   │   ├── services/
│   │   │   ├── resume.service.js
│   │   │   ├── ai.service.js          # Central AI service layer
│   │   │   ├── agent.service.js       # LangChain agent runner
│   │   │   └── version.service.js
│   │   └── utils/
│   │       ├── resumeParser.js        # PDF text extraction
│   │       ├── keywordAnalyzer.js     # ATS keyword matching
│   │       ├── formatChecker.js       # Resume formatting checks
│   │       └── scoreCalculator.js     # Weighted ATS score
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   └── main.jsx
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Google Gemini API Key
- Google OAuth Client ID

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder
```

**2. Install server dependencies**
```bash
cd server
npm install
```

**3. Install client dependencies**
```bash
cd ../client
npm install
```

**4. Configure environment variables** (see [Environment Variables](#environment-variables))

**5. Start the development servers**

In one terminal:
```bash
cd server
npm run dev
```

In another terminal:
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Environment Variables

### `server/.env`
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ai-resume-builder
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your-gemini-api-key
GOOGLE_CLIENT_ID=your-google-client-id
```

### `client/.env`
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

---

## 📡 API Reference

### Resume Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/resumes` | Create a new resume |
| `GET` | `/api/resumes` | List all user's resumes |
| `GET` | `/api/resumes/:id` | Get a specific resume |
| `PUT` | `/api/resumes/:id` | Update full resume |
| `PUT` | `/api/resumes/:id/sections/:section` | Update a specific section |
| `PUT` | `/api/resumes/:id/template` | Change template |
| `DELETE` | `/api/resumes/:id` | Delete a resume |
| `POST` | `/api/resumes/upload` | Upload and parse a PDF resume |

### AI Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/ai/chat` | Chat with the AI interview agent |
| `GET` | `/api/ai/chat-history/:resumeId` | Get conversation history |
| `POST` | `/api/ai/bullets` | Generate STAR bullet points |
| `POST` | `/api/ai/summary` | Generate professional summary |
| `POST` | `/api/ai/ats-score` | Get ATS score against a job description |
| `POST` | `/api/ai/review` | Get full resume review |
| `POST` | `/api/ai/match-job` | Match resume to a job |
| `POST` | `/api/ai/skill-gaps` | Detect skill gaps |

### Version Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/resumes/:resumeId/versions` | Save a version snapshot |
| `GET` | `/api/resumes/:resumeId/versions` | List all versions |
| `GET` | `/api/resumes/:resumeId/versions/:versionId` | Get a specific version |
| `POST` | `/api/resumes/:resumeId/versions/:versionId/restore` | Restore a version |
| `DELETE` | `/api/resumes/:resumeId/versions/:versionId` | Delete a version |

---

## 🏗 Architecture

### AI Agent vs. Direct Prompts

The project intentionally uses two different AI approaches depending on the use case:

| Feature | Approach | Reason |
|---|---|---|
| **Interview Agent** | LangChain `createReactAgent` | Needs to autonomously call tools (update sections, generate bullets, check ATS) based on conversation context |
| **Bullet Writer, ATS Scorer, Reviewer** | Native Gemini `generateContent` | Simple prompt → response — no tool use needed |

### Agent Function Calling Flow

```
User message
    │
    ▼
Interview Agent (LangChain ReAct)
    │
    ├──► update_resume_section({ section, data })    ──► MongoDB update
    ├──► generate_bullet_points({ role, experience }) ──► AI generation
    ├──► get_ats_score({ jobDescription })            ──► Hybrid scoring
    └──► get_resume_data()                            ──► Resume fetch
    │
    ▼
Final text response to user
```

### ATS Scoring System (10 Metrics)

| Metric | Weight | Method |
|---|---|---|
| Keyword Match | 20% | Algorithmic (top-30 JD keywords) |
| Bullet Quality | 15% | AI evaluation |
| Formatting | 10% | Algorithmic (action verbs, structure) |
| Section Completeness | 10% | Algorithmic |
| Summary Strength | 10% | AI evaluation |
| Skill Coverage | 10% | Hybrid |
| Quantification | 10% | Algorithmic |
| Action Verbs | 5% | Algorithmic |
| Length | 5% | Algorithmic |
| Contact Info | 5% | Algorithmic |

---

## 💡 How It Works

### 1. Build & Edit Resume
Create a resume from scratch using the section editor. All changes are persisted in real time to MongoDB with a live preview on the right panel. The `sanitizeSections` utility strips temporary frontend `_id` values before saving to prevent Mongoose CastErrors.

### 2. Upload & Parse PDF
Upload an existing PDF resume. Multer stores it as a memory buffer, pdfjs-dist extracts the raw text page by page, and Gemini parses the text into structured JSON matching the resume schema — all sections populated automatically.

### 3. AI Interview Chat
Chat with the Interview Agent — a real LangChain ReAct agent powered by Gemini 2.5 Flash. The agent sees 4 tools and autonomously decides when to update your resume, generate bullets, or fetch ATS scores during the conversation. Full chat history is persisted per resume.

### 4. ATS Score
Paste any job description. The scorer runs algorithmic analysis (keyword extraction, action verb checks, formatting validation) then sends the results as context to Gemini for AI evaluation. The two scores are averaged per metric for a reliable hybrid result.

### 5. Version History
Save a snapshot of your resume at any point — before tailoring it for a specific job, for example. The snapshot stores the full `sections` object using Mongoose's `Mixed` type. Restore any previous version with a single click.

---

## 📄 License

MIT © 2026

---

> Built as a full-stack AI engineering project exploring LangChain agents, hybrid scoring systems, and production-grade resume tooling.
