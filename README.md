# Claim Whisperer

Claim Whisperer is an inclusive, AI-powered insurance claims platform designed for the elderly, visually impaired, low-literate, or tech-inexperienced individuals who are often excluded from traditional insurance systems due to complex forms, poor accessibility, or language barriers.

Instead of forms, users simply talk to an AI assistant, and the system transcribes, understands, and files the insurance claim for them. The platform supports local Nigerian languages, works with anonymous guest sessions, and includes features like image upload, voice quality feedback, and a mini claim assistant chatbot.

It's like Siri or ChatGPT — but for insurance claims.

---

## 🏗️ Project Architecture

This is a full-stack application with the following components:

- **Backend**: Django REST API with voice processing capabilities
- **Frontend**: React + Vite application (currently in development)
- **AI Orb**: Interactive voice interface component
- **API Scripts**: Python utilities for voice claim processing and document uploads

---

## 🚀 Features

### Core Functionality
- **Voice-First Claim Filing**: File insurance claims by speaking - no forms required
- **Speech-to-Text Processing**: Powered by AssemblyAI for accurate transcription
- **Guest Mode**: File claims without creating an account
- **Document Upload**: Attach images, PDFs, and videos to claims
- **Claim Tracking**: Track claim status with unique claim IDs

### User Management
- **Multi-Role System**: Guest, Registered, and Admin users
- **JWT Authentication**: Secure token-based authentication
- **Anonymous Claims**: Support for users without accounts

### Claim Types Supported
- Auto Accident
- Fire
- Health
- Theft
- Other

### Technical Features
- **RESTful API**: Django REST Framework backend
- **File Upload**: Support for JPEG, PNG, WebP, PDF, and MP4 files
- **Real-time Processing**: Voice transcription with polling
- **Database**: SQLite with Django ORM
- **CORS Support**: Cross-origin resource sharing enabled

---

## 🛠️ Setup & Installation

### Prerequisites
- Python 3.9+
- Node.js 16+
- AssemblyAI API key

### Backend Setup (Django)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Add your AssemblyAI API key to .env
   ```

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the Django server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (React)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

### AI Orb Interface

1. **Open `ai_orb/index.html` in your browser**
2. **Tap to start voice recording**
3. **Speak your claim details**

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login

### Claims
- `POST /api/claims/voice/` - Upload voice and get transcript
- `POST /api/claims/` - Create new claim
- `GET /api/claims/{id}/` - Get claim details
- `GET /api/claims/track/` - Track claim by ID
- `PATCH /api/claims/{id}/` - Update claim status (admin only)

### Attachments
- `POST /api/claims/{claim_id}/upload/` - Upload documents to claim

### Admin
- `GET /api/admin/claims/` - List all claims (admin only)

---

## 🧪 Testing the API

### Voice Claim Processing
```bash
cd API
python voiceClaim.py
```

### Document Upload
```bash
cd API
python uploadDocToClaim.py
```

### Voice Testing
```bash
cd API
python voiceTest.py
```

---

## 📁 Project Structure

```
Claim-Whisper/
├── backend/                 # Django REST API
│   ├── core/               # Main Django app
│   │   ├── models.py       # User, Claim, Attachment models
│   │   ├── views.py        # API endpoints
│   │   └── serializers.py  # Data serialization
│   ├── backend/            # Django settings
│   ├── requirements.txt    # Python dependencies
│   └── manage.py          # Django management
├── frontend/               # React + Vite app
│   ├── src/               # React components
│   ├── package.json       # Node dependencies
│   └── vite.config.js     # Vite configuration
├── API/                   # Python API scripts
│   ├── voiceClaim.py      # Voice processing utility
│   ├── uploadDocToClaim.py # Document upload utility
│   └── voiceTest.py       # Voice testing utility
├── ai_orb/                # Interactive voice interface
│   ├── index.html         # Voice orb interface
│   ├── script.js          # Voice interaction logic
│   └── style.css          # Orb styling
└── README.md              # This file
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
ASSEMBLYAI_API_KEY=your_assemblyai_api_key_here
SECRET_KEY=your_django_secret_key
DEBUG=True
```

### API Keys Required
- **AssemblyAI**: For speech-to-text processing
- Get your API key from [AssemblyAI](https://www.assemblyai.com/)

---

## 🧑‍💻 Usage

### For Users
1. **Voice Interface**: Use the AI Orb or voice API to record your claim
2. **Document Upload**: Attach supporting documents (images, PDFs, videos)
3. **Claim Tracking**: Use your unique claim ID