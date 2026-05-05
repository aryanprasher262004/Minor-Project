# Student_chatbot 🎓
> University student support chatbot powered by Dialogflow + Next.js

## 📊 Project Status

![CI](https://github.com/aryanprasher262004/Minor-Project/actions/workflows/ci.yml/badge.svg)
![CD](https://github.com/aryanprasher262004/Minor-Project/actions/workflows/cd.yml/badge.svg)

## 🚀 Live Demo
🌐 [https://minor-project-m87r.onrender.com](https://minor-project-m87r.onrender.com)

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js 15, Tailwind CSS |
| Backend | Next.js API Routes |
| NLP | Dialogflow |
| Container | Docker (multi-stage) |
| CI/CD | GitHub Actions |
| Hosting | Render.com |
| Monitoring | Betterstack |

## 👥 Team
| Name | GitHub | Role |
|---|---|---|
| Teammate 1 | [@aryanprasher262004](https://github.com/USERNAME_1) | Docker + CI Pipeline |
| Teammate 2 | [@codewitching](https://github.com/USERNAME_2) | Deployment + Monitoring |
| Teammate 3 | [@USERNAME_3](https://github.com/USERNAME_3) | TBD |
| Teammate 4 | [@USERNAME_4](https://github.com/USERNAME_4) | TBD |

## 📁 Project Structure
Minor-Project/
├── .github/
│   └── workflows/
│       ├── ci.yml        # Runs on every push
│       └── cd.yml        # Deploys on merge to main
└── student_chatbot/      # Next.js app
├── Dockerfile
├── app/
├── components/
├── features/chat/
├── nlp/
└── lib/

## ⚙️ Local Setup
```bash
git clone https://github.com/aryanprasher262004/Minor-Project.git
cd Minor-Project/student_chatbot
npm install
cp .env.local.example .env.local  # fill in your keys
npm run dev
```

## 🔑 Environment Variables
| Variable | Description |
|---|---|
| `DIALOGFLOW_PROJECT_ID` | Dialogflow project ID |
| `DIALOGFLOW_CLIENT_EMAIL` | Service account email |
| `DIALOGFLOW_PRIVATE_KEY` | Service account private key |
| `BETTERSTACK_SOURCE_TOKEN` | Betterstack log source token |