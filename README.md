# Soro surance

**Soro surance** is an inclusive, AI-powered insurance claims platform tailored for the elderly, visually impaired, low-literate, or tech-inexperienced individuals who are often left behind in traditional insurance systems due to complex forms, poor accessibility, or language barriers.

Instead of filling forms, users simply talk to an AI assistant — the system transcribes, understands, and files the insurance claim on their behalf. The platform supports **local Nigerian languages**, enables **guest submissions**, and offers features like **document upload**, **voice quality feedback**, and a mini **claim assistant chatbot**.

> It’s like Siri or ChatGPT — but for insurance claims.

---

## 🏗️ Project Architecture

This is a full-stack web and mobile application, with the following structure:

- **Backend**: Django REST Framework with AI voice transcription
- **Frontend**: React + Vite (for web dashboard and admin)
- **Mobile**: React Native (coming soon)
- **AI Orb**: Voice capture widget for browser recording
- **API Scripts**: Python scripts for testing voice and upload flows

---

## 🚀 Features

### Core Capabilities
- 🎙️ **Voice-First Claim Filing** – No forms, just speak
- 🧠 **AI-Powered Transcription & Translation**
- 🌍 **Support for Local Languages** – Yoruba, Hausa, Pidgin, and more
- 🧾 **Guest Claim Submission** – No login required
- 📎 **File Uploads** – Add images, videos, PDFs to claims
- 📬 **Claim Tracking via Claim ID**
- 🧑‍💻 **Admin Panel for Review & Update**

### Technical Features
- 🔐 **JWT Authentication** (for registered users)
- 🧾 **Multi-role Access** (Guests, Users, Admin)
- 🛠 **Rich REST API** (built with DRF)
- 🎯 **Custom Email Templates**
- 📂 **Media Support**: `.jpeg`, `.png`, `.webp`, `.pdf`, `.mp4`
- ⚡ **Live Transcription Polling**

---

## 📡 API Access

Instead of listing all endpoints here, please visit the following for live, self-updating API documentation:

- 🧾 **Schema (OpenAPI)**: [`/api/schema/`](http://localhost:8000/api/schema/)
- 📘 **Swagger Docs**: [`/api/docs/`](http://localhost:8000/api/docs/)

These provide full descriptions of each endpoint, request/response structure, and authentication requirements.

---

## 🛠️ Local Development

### 🔧 Prerequisites
- Python 3.9+
- Node.js 16+
- AssemblyAI API Key
- ffmpeg (required for Whisper)

---

### 🐍 Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Add environment variables
cp .env.example .env
# → Add your ASSEMBLYAI_API_KEY and other config

# Run database setup
python manage.py migrate

# Optional: Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver

```
---
# Frontend Setup
```bash
cd frontend

# Install packages
npm install

# Start dev server
npm run dev
```
---
# AI Orb Setup
```bash
# Just open the HTML file in your browser
open ai_orb/index.html
```
Tap to start recording. Your speech will be transcribed and submitted as a claim.

---

# 🧪 Testing & Automation Scripts
These are helpful for testing the end-to-end workflow:
```bash
# Voice + Claim Creation + Upload
cd tests
python test_claim_workflow.py

# Voice only
cd API
python voiceClaim.py

# Document upload only
cd API
python uploadDocToClaim.py
```

---
# Project Structure
```bash
Claim-Whisper/
├── backend/                 # Django backend
│   ├── backend/               # Settings
│   ├── core/               # Models, views, serializers
│   ├── ai/                 # AI utils: whisper, translation
│   └── manage.py
├── frontend/               # React web app
├── mobile/                 # React Native app (optional)
├── ai_orb/                 # Voice widget for browsers
├── API/                    # Python scripts for voice + upload
├── tests/                  # Automated test scripts
└── README.md
```
---
# Configuration
Create a .env file in your backend/ directory:
```bash
ASSEMBLYAI_API_KEY=your_assemblyai_key
SECRET_KEY=your_django_secret_key
DEBUG=True
```
---
# 👥 For Users
Tap to Speak: Use the AI Orb or upload audio

Transcribe & Translate: System processes voice input

Track Your Claim: Use the claim ID to follow up

Upload Evidence: Add media (images, docs, videos)

# 📢 Contact
For questions or contributions, open an issue or contact the team at claimwhisperer@yourdomain.com.

# 🧠 Credits
Built with ❤️ by the Soro surance team — committed to inclusive innovation.

# 🏁 License
MIT License. See LICENSE.md for details.