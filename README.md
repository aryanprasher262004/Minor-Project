# CampusX — Intelligent University Chatbot

![CI Build and Test](https://github.com/aryanprasher262004/Minor-Project/actions/workflows/ci.yml/badge.svg)
![CD Deploy to Production](https://github.com/aryanprasher262004/Minor-Project/actions/workflows/cd.yml/badge.svg)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![Live](https://img.shields.io/badge/Live-minor--project--m87r.onrender.com-46E3B7?logo=render&logoColor=white)
---
> An AI-powered student support chatbot integrated into a university website.
> Built with Next.js 15, Dialogflow NLP, Docker, and GitHub Actions CI/CD.

---

## 🌍 Live Demo
👉 **[CampusX Live Demo](https://minor-project-m87r.onrender.com)**


## 👥 Team
| Role | Name |
|------|------|
| Backend + DevOps (CI/CD + Docker) | Aryan Prasher |
| Deployment + Monitoring | Anshika Yadav |
| Frontend + Documentation | Aditya Narayan -- Itisha Panwar|

---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, Tailwind CSS |
| Backend | Next.js API Routes |
| NLP | Dialogflow |
| Container | Docker (multi-stage) |
| CI/CD | GitHub Actions |
| Hosting | Render.com |
| Monitoring | Betterstack |

---

## 🚀 DevOps Pipeline

\`\`\`
Push to branch → CI (lint + build + docker test)
Merge to main  → CD (build image → push to GHCR → deploy to Render)
Live 24/7      → Betterstack monitors uptime + logs
\`\`\`

---

## 🐳 Run Locally with Docker

\`\`\`bash
git clone https://github.com/aryanprasher262004/Minor-Project.git
cd Minor-Project/student_chatbot
docker compose up
\`\`\`
Open http://localhost:3000

---

## 💻 Run Locally without Docker

\`\`\`bash
cd student_chatbot
npm install
npm run dev
\`\`\`

---

Lets understand from these mermaid Diagrams 
## 📊 System Architecture
<pre> ```mermaid flowchart TD %% ─────────────── USER FLOW ─────────────── A[Student User] --> B[CampusX Website UI] B --> C[/api/chat Endpoint] %% ─────────────── BACKEND ENTRY ─────────────── C --> D[Chat Controller] %% ─────────────── CORE SERVICE ─────────────── D --> E[Chat Service] %% ─────────────── SERVICE INTERNALS ─────────────── E --> F[Session Memory Store] E --> G[NLP Layer - Dialogflow] E --> H[Knowledge Base Service] %% ─────────────── NLP FLOW ─────────────── G --> G1[Intent Detection] G1 --> G2[Intent + Confidence + Entities] %% ─────────────── KNOWLEDGE FLOW ─────────────── H --> H1[Static JSON / Future DB] %% ─────────────── MEMORY FLOW ─────────────── F --> F1[Store User Message] F --> F2[Store Bot Response] F --> F3[Fetch Session History] %% ─────────────── DB LOGGING (FUTURE / OPTIONAL) ─────────────── E --> I[Database Layer] I --> I1[(Convex / Supabase)] %% ─────────────── RESPONSE FLOW ─────────────── E --> J[Response Builder] J --> K[API Response] K --> B %% ─────────────── FRONTEND UI ─────────────── B --> L[Chat UI Components] L --> L1[Chat Window] L --> L2[Message Bubble] L --> L3[Chat Input] ``` </pre>






## 🖥️ Frontend Architecture
<pre> ```mermaid flowchart TD A[Student User] --> B[CampusX Website] B --> C[Dashboard Page] B --> D[Admissions Page] B --> E[Courses Page] B --> F[Placements Page] B --> G[Library Page] B --> H[Chat Page] H --> I[Chat Window] I --> J[Message Bubble] I --> K[Chat Input] K --> L[Send Message] L --> M[/api/chat API Call] M --> I ``` </pre>


## ⚙️ Backend Architecture
<pre> ```mermaid flowchart TD A[/api/chat Endpoint] --> B[Chat Controller] B --> C[Chat Service] C --> D[Session Memory Store] C --> E[Knowledge Base Service] C --> F[Response Builder] D --> D1[Store User Message] D --> D2[Store Bot Response] D --> D3[Fetch History] E --> E1[Static JSON Data] C --> G[Database Logger] G --> G1[(Convex / Supabase - Future)] F --> H[Formatted API Response] H --> I[Return to Frontend] ``` </pre>


## 🧠 NLP Flow
<pre> ```mermaid flowchart TD A[User Message] --> B[NLP Layer] B --> C[Dialogflow / NLP Engine] C --> D[Intent Detection] D --> E[Intent Name] C --> F[Confidence Score] C --> G[Entity Extraction] E --> H[Chat Service Decision] H --> I[Fetch Answer from Knowledge Base] I --> J[Bot Response] ``` </pre>



## 🧩 1. SYSTEM DESIGN (High-Level Architecture)
<pre> ```mermaid flowchart LR A[Student User] --> B[Frontend - CampusX UI] B --> C[/api/chat Endpoint] C --> D[Chat Controller] D --> E[Chat Service] E --> F[Session Memory] E --> G[NLP Engine] E --> H[Knowledge Base] E --> I[Response Builder] I --> B E --> J[(Database - Future)] ``` </pre>

## 🔁 2. SEQUENCE DIAGRAM (Request Lifecycle)
<pre> ```mermaid sequenceDiagram participant User participant UI as Frontend UI participant API as /api/chat participant Service as Chat Service participant NLP as NLP Engine participant KB as Knowledge Base participant Memory as Session Memory User->>UI: Send Message UI->>API: POST /api/chat API->>Service: processChat() Service->>Memory: store user message Service->>NLP: detectIntent(message) NLP-->>Service: intent + confidence Service->>KB: getAnswer(intent) KB-->>Service: response Service->>Memory: store bot response Service-->>API: structured response API-->>UI: JSON response UI-->>User: Display reply ``` </pre>

## 🚀 3. DEPLOYMENT DIAGRAM (Docker + Future CI/CD)
<pre> ```mermaid flowchart TD A[Developer] --> B[GitHub Repository] B --> C[CI/CD Pipeline] C --> D[Build Docker Image] D --> E[Container Registry] E --> F[Deployment Server] F --> G[Docker Container - Next.js App] G --> H[User Access via Browser] G --> I[(Future DB - Convex / Supabase)] G --> J[NLP API (Dialogflow)] ``` </pre>