# ResumeAI — Smart Resume Analysis Platform

A production-grade Resume Analysis Platform powered by **Google Gemini AI**. Upload your resume, get an instant ATS score, skills analysis, and actionable recommendations.

## Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** v3
- **React Router** v6
- **Axios** with interceptors
- **Chart.js** + react-chartjs-2
- **Framer Motion** for animations
- **React Dropzone** for file upload
- **React Hot Toast** for notifications

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + Mongoose
- **JWT** authentication
- **bcryptjs** password hashing
- **Multer** file upload
- **Google Gemini AI** for resume analysis
- **Helmet** + CORS + Rate Limiting (security)
- **Winston** structured logging
- **Swagger** API documentation
- **Express Validator** request validation

## Features

- 🔐 User Registration & Login (JWT)
- 📄 PDF Resume Upload (Drag & Drop)
- 🤖 AI-Powered Resume Analysis (Gemini)
- 📊 ATS Score (0-100) with Category Breakdown
- ✅ Skills Found / ❌ Missing Keywords
- 💡 Actionable Recommendations
- 📈 Dashboard with Stats & Charts
- 📋 Analysis History with Search & Pagination
- 🌙 Dark Mode (System Preference + Toggle)
- 📱 Fully Responsive UI
- 📚 Swagger API Documentation

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API Key

### 1. Clone & Install

```bash
git clone https://github.com/abhitsahu/resume-analysis.git
cd resume-analysis
```

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Environment Setup

Copy the example env file and fill in your values:

```bash
cp backend/.env.example backend/.env
```

Required variables:
```
PORT=3000
MONGO_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
ENCRYPTION_KEY=your_32_byte_encryption_key
FRONTEND_URL=http://localhost:5173
```

### 3. Run Development Servers

#### Backend (Port 3000)
```bash
cd backend
npm run dev
```

#### Frontend (Port 5173)
```bash
cd frontend
npm run dev
```

### 4. Access the App

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api-docs

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current profile |
| PUT | `/api/auth/profile` | Update profile |

### Resume
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/upload` | Upload & analyze PDF |
| POST | `/api/resume/enrich` | Analyze from URL |
| GET | `/api/resume` | List user's resumes |
| GET | `/api/resume/stats` | Dashboard stats |
| GET | `/api/resume/:id` | Get analysis detail |
| POST | `/api/resume/search` | Search by name |

## Project Structure

```
resume-analysis/
├── backend/
│   ├── src/
│   │   ├── config/        # DB, Gemini, env validation
│   │   ├── controllers/   # Route handlers
│   │   ├── middlewares/    # Auth, error handler, upload
│   │   ├── models/        # Mongoose schemas
│   │   ├── repositories/  # Data access layer
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Logger, errors, encryption
│   │   └── validators/    # Request validation
│   ├── server.js
│   └── swagger.js
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API client
│   │   ├── context/       # Auth & Theme providers
│   │   └── routes/        # Protected routes
│   └── index.html
├── docker-compose.yml
└── README.md
```

## Docker Deployment

```bash
docker-compose up -d
```

## License

ISC
