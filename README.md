# CampusX — Intelligent University Chatbot

![CI Build and Test](https://github.com/aryanprasher262004/Minor-Project/actions/workflows/ci.yml/badge.svg)
![CD Deploy to Production](https://github.com/aryanprasher262004/Minor-Project/actions/workflows/cd.yml/badge.svg)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)
![Live](https://img.shields.io/badge/Live-Render.com-46E3B7?logo=render&logoColor=white)

> An AI-powered student support chatbot integrated into a university website.
> Built with Next.js 15, Dialogflow NLP, Docker, and GitHub Actions CI/CD.

---

## 🌍 Live Demo
👉 **[YOUR-RENDER-URL-HERE](https://your-app.onrender.com)**

---

## 👥 Team
| Role | Name |
|------|------|
| Backend + DevOps (CI/CD + Docker) | Aryan Prasher |
| Deployment + Monitoring | Teammate 2 |

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

## 📊 System Architecture

\`\`\`
Student → CampusX Website → /api/chat
                                ↓
                         Chat Controller
                                ↓
                    ┌─────────────────────┐
                    │    Chat Service      │
                    │  • Session Memory    │
                    │  • Dialogflow NLP    │
                    │  • Knowledge Base    │
                    └─────────────────────┘
                                ↓
                         Bot Response
\`\`\`
