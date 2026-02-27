# Student Chatbot — Project Rules & Architecture Guide

## Purpose

This document defines the architecture, coding rules, and collaboration standards for the **University Student Chatbot Project**.

All teammates and AI coding tools MUST follow these rules to keep the project consistent, scalable, and maintainable.

---

# 1. Architecture Philosophy

This project follows a **Modular Monolith Architecture**.

We are building:

UI → API → Business Logic → NLP → Knowledge Source → Response

We DO NOT build microservices initially.
The system must remain modular so it can later evolve into microservices without rewriting code.

---

# 2. Folder Responsibilities

## `/app`

Owned by Next.js routing.

Contains:

* Pages
* Layouts
* API routes

Rules:

* No business logic here.
* Only request handling and routing.

---

## `/components`

Frontend UI ONLY.

Allowed:

* UI rendering
* styling
* event handling

NOT allowed:

* API calls directly to NLP
* business logic
* database logic

Components must remain reusable.

---

## `/features`

Application business logic.

This is the **main brain** of the app.

Structure:

* controller → orchestrates flow
* service → executes logic
* types → feature-specific types

All chatbot workflows live here.

---

## `/nlp`

All NLP integrations.

Rules:

* Only this folder communicates with Wit.ai.
* No other folder may call Wit.ai directly.
* NLP responses must be parsed before leaving this layer.

---

## `/knowledge`

Knowledge retrieval system.

Contains:

* knowledge_base.json
* lookup logic

Rules:

* No UI logic.
* No API routing.
* Only data lookup responsibilities.

---

## `/lib`

Shared helpers and utilities.

Examples:

* response formatter
* constants
* helper functions

Must remain generic and reusable.

---

## `/db`

Future database layer.

Currently unused for MVP.

Later responsibilities:

* chat memory
* conversations
* persistence

---

## `/types`

Global TypeScript types shared across the project.

---

# 3. Request Flow (MANDATORY)

All chatbot requests must follow:

User → UI Component
→ `/app/api/chat/route.ts`
→ Feature Controller
→ NLP Layer
→ Knowledge Layer
→ Response Builder
→ UI

No shortcuts allowed.

---

# 4. Import Direction Rules (VERY IMPORTANT)

Dependencies must flow ONE WAY only:

components → features → nlp → knowledge → db

NEVER import backwards.

Examples:

✅ Allowed:

* feature imports nlp
* api imports feature

❌ Not allowed:

* component importing feature service directly
* nlp importing components

This prevents circular dependencies.

---

# 5. API Rules

All backend logic starts from:

`/app/api/chat/route.ts`

Rules:

* Validate request
* Call controller
* Return formatted response

API routes must remain thin.

---

# 6. NLP Rules

Only files inside `/nlp` can:

* call Wit.ai APIs
* parse intents

Other folders must use NLP services indirectly.

This allows future NLP replacement without breaking the app.

---

# 7. Knowledge Base Rules

Knowledge data must be accessed ONLY through:

`knowledge.service.ts`

Never read JSON files directly elsewhere.

Reason:
Later JSON → Database migration should require zero refactoring.

---

# 8. Naming Conventions

Files:

* kebab-case folders
* camelCase functions
* PascalCase React components

Examples:

* chat.service.ts ✅
* ChatWindow.tsx ✅

---

# 9. Team Ownership Model

Suggested ownership:

Frontend:

* `/components`
* `/app/chat`

Backend:

* `/features`
* `/app/api`

NLP:

* `/nlp`

Data:

* `/knowledge`

Everyone may review PRs, but ownership prevents conflicts.

---

# 10. AI Editor Usage Rules

When using AI tools:

Always specify:

* target folder
* file type
* responsibility

Example prompt:
"Create a chat service inside `/features/chat` that calls NLP layer and returns a formatted response."

Never allow AI tools to create new top-level folders.

---

# 11. MVP Scope Rules

Current MVP includes:

* FAQ chatbot
* one-question → one-answer
* JSON knowledge base
* Wit.ai intent detection

NOT included yet:

* chat memory
* authentication
* database persistence
* microservices

---

# 12. Future Expansion Compatibility

The architecture must allow:

* Convex database integration
* multi-chat memory
* admin dashboard
* hybrid AI models
* Docker deployment

Code should always be written with replaceable modules.

---

# 13. Golden Rule

If unsure where code belongs:

Ask:

"Is this UI, Logic, NLP, or Data?"

Place code according to responsibility — NOT convenience.

---

END OF RULES
