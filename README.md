# LearnSphere – Online Learning & Course Management Platform

LearnSphere is a MERN-based online learning and course management platform designed to provide a complete learning ecosystem for **Students, Instructors, and Administrators**.

The platform supports secure authentication, course creation and management, enrollment, online payments, lecture progress tracking, ratings and reviews, media storage, lecture transcription, retrieval-augmented AI learning assistance, AI-generated quizzes, summaries, and lecture notes.

> **Creator:** Tanay Gupt

---

## 🚀 Overview

Traditional online learning platforms often separate course delivery, progress tracking, assessments, and AI-assisted learning into different tools.

**LearnSphere** brings these capabilities together into a single full-stack application.

The platform provides three primary user roles:

- 🎓 **Student** – Discover courses, enroll, learn, track progress, review courses, and use AI learning tools.
- 👨‍🏫 **Instructor** – Create and manage courses, upload lectures, generate quizzes, and monitor course performance.
- 🛡️ **Admin** – Manage platform-level course categories and administrative functionality.

The application follows a client-server architecture using **React.js** on the frontend and **Node.js + Express.js** on the backend, with **MongoDB** as the primary database.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access control
- Student, Instructor, and Admin roles
- Protected frontend routes
- Protected backend API routes
- Email OTP verification during registration
- Forgot-password functionality
- Password reset using secure reset tokens
- Password change functionality
- Profile management

### 🎓 Student Features

Students can:

- Browse available courses
- Browse courses by category
- View detailed course information
- View instructor information
- Add courses to cart
- Purchase courses through Razorpay
- Access enrolled courses
- Track lecture completion
- Track overall course progress
- Watch lecture videos
- Attempt quizzes
- View quiz results
- Submit course ratings and reviews
- Use AI-powered lecture assistance
- Generate lecture summaries
- Generate revision notes
- Ask questions about lecture content

### 👨‍🏫 Instructor Features

Instructors can:

- Access an instructor dashboard
- View instructor statistics
- Create courses
- Edit courses
- Delete courses
- Add course sections
- Update sections
- Delete sections
- Add lectures/subsections
- Update lectures
- Delete lectures
- Upload lecture videos
- Store course media using Cloudinary
- Generate quizzes from lecture transcripts
- Publish courses
- View instructor-owned courses

### 🛡️ Admin Features

Administrators have platform-level functionality including:

- Admin-only authentication
- Admin authorization
- Course category management
- Creation of new course categories

The Admin role is intentionally **not exposed through public signup**.

An administrator can be created through the provided command-line seed script.

---

# 🤖 AI-Assisted Learning

One of the core features of LearnSphere is its AI-assisted learning workflow.

The platform uses lecture transcripts and embeddings to allow students to interact with course content using natural language.

### AI capabilities include:

- Lecture Q&A
- Lecture summaries
- Revision notes
- AI-generated quizzes
- Transcript processing
- Semantic retrieval using embeddings

---

## 🧠 Retrieval-Augmented Generation (RAG)

LearnSphere implements a Retrieval-Augmented Generation workflow for lecture-based question answering.

### Pipeline

```text
Instructor uploads lecture
        ↓
Cloudinary stores lecture video
        ↓
AssemblyAI transcribes lecture
        ↓
Transcript is divided into chunks
        ↓
Text chunks are converted into embeddings
        ↓
Embeddings are stored in MongoDB
        ↓
Student asks a question
        ↓
Question is converted into an embedding
        ↓
MongoDB Atlas Vector Search
        ↓
Relevant lecture chunks are retrieved
        ↓
Relevant context is provided to Groq
        ↓
AI-generated answer
        ↓
Answer displayed to student
```

This allows the AI assistant to answer questions using relevant lecture content rather than relying only on general-purpose model knowledge.

---

## 🔎 Embeddings & Vector Search

By default, LearnSphere uses:

```text
Xenova/all-MiniLM-L6-v2
```

for local embedding generation.

The default model produces:

```text
384-dimensional vectors
```

These vectors are stored in MongoDB and searched using **MongoDB Atlas Vector Search**.

### Default configuration

```text
Embedding Provider:
Xenova/all-MiniLM-L6-v2

Vector Dimensions:
384

Similarity:
Cosine

MongoDB Vector Index:
lecture_embedding_index
```

---

## 🔄 Optional OpenAI Embeddings

The project also supports OpenAI embeddings.

Set:

```env
USE_EMBEDDING_API=true
```

and configure:

```env
OPENAI_API_KEY=your_openai_api_key
```

The project then uses:

```text
text-embedding-3-small
```

which produces:

```text
1536-dimensional vectors
```

If this option is enabled, the MongoDB Atlas Vector Search index must also be configured for **1536 dimensions**.

---

# 💳 Payment System

LearnSphere integrates **Razorpay** for course purchases.

The payment workflow includes:

1. Student selects a course.
2. Course is added to the cart.
3. Backend creates a Razorpay payment order.
4. Razorpay checkout is opened.
5. Student completes payment.
6. Razorpay returns payment information.
7. Backend verifies the payment signature.
8. Enrollment is created only after successful server-side verification.
9. Payment success information can be sent through email.

### Security

Payment verification is performed on the server.

The Razorpay secret key is never exposed to the React frontend.

---

# ☁️ Media Management

LearnSphere uses **Cloudinary** for media storage.

Cloudinary handles assets such as:

- Course thumbnails
- Lecture videos
- Profile pictures
- Other uploaded media

This prevents large media files from being stored directly inside MongoDB.

---

# 🎙️ Lecture Transcription

Uploaded lecture videos can be processed using **AssemblyAI**.

The workflow is:

```text
Lecture Video
     ↓
Cloudinary
     ↓
AssemblyAI
     ↓
Transcript
     ↓
Transcript Processing
     ↓
Embedding Generation
     ↓
MongoDB Vector Storage
```

The transcript can subsequently be used for:

- AI Q&A
- Lecture summaries
- Revision notes
- Quiz generation

---

# 📝 AI-Generated Assessments

LearnSphere can generate quizzes from lecture transcripts.

The instructor can generate a quiz from processed lecture content.

Students can then:

- Access lecture quizzes
- Answer MCQs
- Submit answers
- Receive quiz results

This provides an additional assessment layer on top of video-based learning.

---

# 📚 Course Management

Courses are organized into structured learning content.

```text
Course
│
├── Course Information
│
├── Section
│   ├── Lecture / Subsection
│   ├── Lecture / Subsection
│   └── Quiz
│
├── Section
│   ├── Lecture / Subsection
│   └── Lecture / Subsection
│
└── Section
    └── Lecture / Subsection
```

This structure allows instructors to create organized learning paths instead of uploading isolated videos.

---

# 📈 Progress Tracking

Students can track their learning progress through enrolled courses.

The system records lecture completion and calculates course progress based on completed learning content.

Students can therefore resume courses and monitor their learning progress from their dashboard.

---

# ⭐ Ratings & Reviews

Students can submit ratings and reviews for courses they have taken.

The platform supports:

- Course ratings
- Written reviews
- Average course ratings
- Review retrieval

This provides feedback for instructors and helps other students evaluate courses.

---

# 🏗️ Technology Stack

## Frontend

- React.js
- Redux Toolkit
- React Router
- Axios
- React Hook Form
- React Dropzone
- React Player
- React Icons
- Framer Motion
- Chart.js
- React Hot Toast
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer
- Razorpay SDK
- Cloudinary SDK

## AI / ML

- Groq
- AssemblyAI
- Xenova Transformers
- OpenAI Embeddings (optional)
- LangChain
- MongoDB Atlas Vector Search

## Development

- npm
- Nodemon
- Concurrently
- Create React App

---

# 🧩 System Architecture

```text
                       ┌─────────────────────┐
                       │      Student        │
                       └──────────┬──────────┘
                                  │
                       ┌──────────▼──────────┐
                       │     React.js UI     │
                       │   Redux Toolkit     │
                       └──────────┬──────────┘
                                  │
                              REST API
                                  │
                       ┌──────────▼──────────┐
                       │ Express.js Server   │
                       │ JWT Middleware      │
                       │ Role Authorization  │
                       └──────────┬──────────┘
                                  │
               ┌──────────────────┼──────────────────┐
               │                  │                  │
        ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐
        │   MongoDB   │    │  Cloudinary │    │  Razorpay   │
        │   Database  │    │    Media    │    │  Payments   │
        └─────────────┘    └─────────────┘    └─────────────┘
                                  │
                         ┌────────▼────────┐
                         │   AI Pipeline   │
                         ├─────────────────┤
                         │   AssemblyAI    │
                         │   Embeddings    │
                         │ MongoDB Vector  │
                         │     Search      │
                         │      Groq       │
                         └─────────────────┘
```

---

# 📂 Project Structure

```text
LearnSphere/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── core/
│   │   │   ├── Auth/
│   │   │   ├── Course/
│   │   │   ├── Dashboard/
│   │   │   └── ViewCourses/
│   │   └── ContactUsPage/
│   │
│   ├── pages/
│   ├── services/
│   ├── slices/
│   └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   │   └── create-admin.js
│   └── utils/
│       ├── embedding.js
│       ├── generateQuizFromTranscript.js
│       ├── generateTranscript.js
│       ├── processAndStoreChunks.js
│       ├── processTranscriptRAG.js
│       └── mailSender.js
│
├── .env.example
├── server/
│   └── .env.example
├── package.json
└── README.md
```

---

# 🔑 Environment Variables

The frontend requires:

```env
REACT_APP_BASE_URL=http://localhost:5000/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

The backend requires:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FOLDER_NAME=learnsphere
```

### Cloudinary

```env
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### Razorpay

```env
RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
```

### SMTP

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your_email@example.com
MAIL_PASS=your_app_password
MAIL_FROM=LearnSphere <your_email@example.com>
```

### Application URL

```env
REACT_APP_FRONTEND_URL=http://localhost:3000
```

### AI Services

```env
GROQ_API_KEY=your_groq_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
```

### Embeddings

Default local embedding configuration:

```env
USE_EMBEDDING_API=false
```

Optional OpenAI configuration:

```env
USE_EMBEDDING_API=true
OPENAI_API_KEY=your_openai_api_key
```

> Never commit `.env` files or API keys to GitHub.

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/LearnSphere.git
cd LearnSphere
```

## 2. Install Frontend Dependencies

```bash
npm install
```

## 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

---

# 🗄️ MongoDB Setup

Create a MongoDB Atlas cluster and obtain your connection string.

Add it to:

```env
MONGODB_URL=your_connection_string
```

Example:

```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/learnsphere
```

Make sure your IP address is allowed in MongoDB Atlas network access settings.

---

# 🔎 MongoDB Atlas Vector Search Setup

The AI Q&A system requires a vector search index.

Navigate to the MongoDB Atlas collection used for lecture chunks and create a Vector Search index.

Use:

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 384,
      "similarity": "cosine"
    }
  ]
}
```

Use the index name:

```text
lecture_embedding_index
```

This configuration corresponds to the default:

```text
Xenova/all-MiniLM-L6-v2
```

embedding model.

---

# 👤 Creating an Admin

Admin accounts are not created through public signup.

From the project root:

```bash
npm run admin:create -- admin@example.com StrongPassword123 "Tanay" "Gupt"
```

This creates an administrator account that can access admin-only functionality.

---

# ▶️ Running the Application

From the project root:

```bash
npm run dev
```

This starts both:

```text
Frontend → http://localhost:3000
Backend  → http://localhost:5000
```

The project uses `concurrently` to run both applications together.

---

# 🧪 Development Commands

### Start frontend

```bash
npm start
```

### Start backend

```bash
npm run server
```

### Start frontend + backend

```bash
npm run dev
```

### Build frontend

```bash
npm run build
```

### Create admin

```bash
npm run admin:create -- email password "First" "Last"
```

---

# 🔌 API Structure

The backend follows a REST API architecture.

Base URL:

```text
/api/v1
```

## Authentication

```text
POST /api/v1/auth/login
POST /api/v1/auth/signup
POST /api/v1/auth/sendotp
POST /api/v1/auth/changepassword
POST /api/v1/auth/reset-password-token
POST /api/v1/auth/reset-password
```

## Courses

```text
POST /api/v1/course/createCourse
POST /api/v1/course/addSection
POST /api/v1/course/updateSection
POST /api/v1/course/deleteSection

POST /api/v1/course/addSubSection
POST /api/v1/course/updateSubSection
POST /api/v1/course/deleteSubSection

GET  /api/v1/course/getAllCourses
POST /api/v1/course/getCourseDetails
POST /api/v1/course/getFullCourseDetails

POST /api/v1/course/editCourse
GET  /api/v1/course/getInstructorCourses
DELETE /api/v1/course/deleteCourse
```

## Course Progress

```text
POST /api/v1/course/updateCourseProgress
```

## Quizzes

```text
POST /api/v1/course/generateQuiz
POST /api/v1/course/getStudentQuiz
POST /api/v1/course/submitQuizAnswers
```

## Categories

```text
POST /api/v1/course/createCategory
GET  /api/v1/course/showAllCategories
POST /api/v1/course/getCategoryPageDetails
```

## Ratings & Reviews

```text
POST /api/v1/course/createRating
GET  /api/v1/course/getAverageRating
GET  /api/v1/course/getReviews
```

## Payments

```text
POST /api/v1/payment/capturePayment
POST /api/v1/payment/verifyPayment
POST /api/v1/payment/sendPaymentSuccessEmail
```

## AI Learning Assistant

```text
POST /api/v1/ai/ask
POST /api/v1/ai/summary
POST /api/v1/ai/notes
```

## Profile

```text
GET    /api/v1/profile/getUserDetails
GET    /api/v1/profile/getEnrolledCourses
GET    /api/v1/profile/instructorDashboard

PUT    /api/v1/profile/updateProfile
PUT    /api/v1/profile/updateDisplayPicture

DELETE /api/v1/profile/deleteProfile
```

---

# 🔐 Role-Based Access Control

### Student

Can:

- Browse courses
- Purchase courses
- Access enrolled courses
- Track progress
- Take quizzes
- Submit reviews
- Use AI learning features

### Instructor

Can:

- Create courses
- Edit courses
- Delete courses
- Create sections
- Create lectures
- Upload course content
- Generate quizzes
- View instructor dashboard

### Admin

Can:

- Manage platform categories
- Access admin-only operations

The backend verifies both authentication and authorization before allowing protected operations.

---

# 🔒 Security Considerations

LearnSphere follows several security practices:

- JWT authentication
- Password hashing using bcrypt
- Protected backend routes
- Role-based authorization middleware
- Environment-based secret management
- Server-side Razorpay signature verification
- Admin role restricted from public signup
- API keys kept outside the frontend
- Password reset tokens
- OTP-based email verification

Sensitive credentials should always remain inside environment variables.

---

# 🧑‍💻 Development Workflow

A typical instructor workflow is:

```text
Instructor Login
       ↓
Instructor Dashboard
       ↓
Create Course
       ↓
Add Course Information
       ↓
Create Sections
       ↓
Add Lectures
       ↓
Upload Lecture Video
       ↓
Cloudinary Storage
       ↓
AssemblyAI Transcription
       ↓
Transcript Processing
       ↓
Embedding Generation
       ↓
MongoDB Vector Storage
       ↓
Publish Course
```

A typical student workflow is:

```text
Student Signup
       ↓
Email OTP Verification
       ↓
Login
       ↓
Browse Courses
       ↓
View Course
       ↓
Add to Cart
       ↓
Razorpay Payment
       ↓
Server-side Verification
       ↓
Course Enrollment
       ↓
Watch Lectures
       ↓
Track Progress
       ↓
Take Quiz
       ↓
Use AI Learning Assistant
       ↓
Submit Rating / Review
```

---

# 🧠 AI Question-Answering Workflow

When a student asks a question about a lecture:

### Step 1 — User Query

The student enters a natural-language question.

### Step 2 — Query Embedding

The question is converted into a vector representation.

### Step 3 — Vector Search

MongoDB Atlas Vector Search compares the question embedding against stored transcript embeddings.

### Step 4 — Relevant Context

The most relevant lecture transcript chunks are retrieved.

### Step 5 — LLM Generation

The retrieved context is passed to Groq.

### Step 6 — Response

Groq generates an answer based on the retrieved lecture context.

This architecture helps make the AI assistant more relevant to the actual course material.

---

# 📊 Instructor Dashboard

The instructor dashboard provides an overview of instructor-owned course information and learning activity.

Charts are implemented using:

```text
Chart.js
react-chartjs-2
```

---

# 🎨 Frontend Architecture

The React application is organized around reusable components and feature-specific modules.

Important areas include:

```text
Auth
Course
Dashboard
ViewCourses
About
Contact
Common Components
```

Redux Toolkit is used for application state management.

Axios is used for communication between the React client and Express API.

---

# 📦 Important External Services

| Service | Purpose |
|---|---|
| MongoDB Atlas | Application database |
| MongoDB Vector Search | Semantic lecture retrieval |
| Cloudinary | Media storage |
| Razorpay | Course payments |
| AssemblyAI | Lecture transcription |
| Groq | AI generation |
| SMTP/Nodemailer | OTP and email workflows |
| Xenova Transformers | Local embeddings |
| OpenAI | Optional embedding provider |

---

# 🚧 Current Limitations

LearnSphere is primarily intended as a portfolio and learning project.

Some functionality depends on external services and requires valid API credentials.

For a complete production deployment, additional work could include:

- Automated test coverage
- CI/CD pipelines
- Advanced monitoring and logging
- Rate limiting
- More granular API validation
- Production-grade error tracking
- CDN and caching strategies
- Automated database backups
- Expanded administrative controls
- Additional payment edge-case handling

---

# 🔮 Future Improvements

Potential future enhancements include:

- Live classes
- Instructor-student messaging
- Course completion certificates
- Learning streaks
- Personalized course recommendations
- AI-powered learning paths
- Advanced analytics
- Discussion forums
- Peer-to-peer learning
- Bookmarking and highlights
- AI flashcard generation
- AI-powered adaptive assessments
- Mobile application
- Notification system
- Advanced admin analytics

---

# 🧪 Recommended Testing Checklist

Before considering a local deployment complete:

### Authentication

- [ ] Student signup
- [ ] Instructor signup
- [ ] OTP verification
- [ ] Login
- [ ] Logout
- [ ] Password change
- [ ] Forgot password
- [ ] Password reset
- [ ] Invalid credentials
- [ ] Protected routes

### Student

- [ ] Browse courses
- [ ] Search/view course
- [ ] Add course to cart
- [ ] Razorpay checkout
- [ ] Payment verification
- [ ] Course enrollment
- [ ] Watch lecture
- [ ] Update progress
- [ ] Take quiz
- [ ] Submit quiz
- [ ] Submit review
- [ ] AI Q&A
- [ ] AI summary
- [ ] AI notes

### Instructor

- [ ] Create course
- [ ] Edit course
- [ ] Delete course
- [ ] Create section
- [ ] Add lecture
- [ ] Upload video
- [ ] Generate transcript
- [ ] Generate quiz
- [ ] Publish course
- [ ] Instructor dashboard

### Admin

- [ ] Admin login
- [ ] Category creation
- [ ] Admin authorization
- [ ] Verify students cannot access admin routes
- [ ] Verify instructors cannot access admin routes

### Security

- [ ] Invalid JWT
- [ ] Expired JWT
- [ ] Unauthorized role
- [ ] Invalid payment signature
- [ ] Invalid password-reset token
- [ ] Missing required environment variables

---

# 📌 GitHub Security Checklist

Before pushing LearnSphere to GitHub:

```text
❌ Never commit:
.env
server/.env
API keys
Database passwords
JWT secrets
Razorpay secrets
SMTP passwords
Cloudinary secrets
Groq API keys
AssemblyAI API keys
OpenAI API keys
```

The repository contains example environment files:

```text
.env.example
server/.env.example
```

These should contain placeholders only.

---

# 💼 Resume Relevance

LearnSphere demonstrates practical experience with:

- Full-stack MERN development
- REST API design
- Authentication and authorization
- Role-based access control
- Payment integration
- Cloud media storage
- Email verification
- Course and content management
- Database modeling
- Progress tracking
- AI integration
- Retrieval-Augmented Generation
- Embeddings
- Vector databases/search
- Speech-to-text processing
- AI-generated assessments

The project demonstrates how multiple backend services and AI components can be integrated into a single full-stack application.

---

# 🎯 Interview Talking Points

### Why JWT?

JWT provides stateless authentication between the frontend and backend and allows protected API endpoints to verify the identity of the requesting user.

### Why role-based middleware?

Authentication determines **who the user is**, while authorization determines **what the user is allowed to do**.

LearnSphere separates these concerns using authentication and role-based middleware.

### Why Cloudinary?

Video and image files are better handled through dedicated media storage rather than storing large binary files directly in MongoDB.

### Why Razorpay server-side verification?

The frontend cannot be trusted to declare that a payment succeeded.

The backend verifies the Razorpay payment signature before creating the enrollment.

### Why embeddings?

Keyword matching cannot reliably understand semantic similarity.

Embeddings allow the system to represent text as vectors and retrieve conceptually relevant lecture content.

### Why MongoDB Vector Search?

MongoDB already stores the application's learning data, so vector search allows lecture embeddings to remain close to the application data while supporting semantic retrieval.

### Why RAG?

Instead of asking the LLM to answer solely from its general knowledge, LearnSphere retrieves relevant lecture content first and supplies that context to the model.

This makes the response more grounded in the course material.

---

# 👨‍💻 Author

## Tanay Gupt

B.Tech Computer Science & Engineering

Interested in:

- Full-Stack Development
- MERN Stack
- Python
- Data Structures & Algorithms
- AI-integrated applications

---

# 📄 License

This project is intended primarily for educational, portfolio, and demonstration purposes.

---

# ⭐ Acknowledgements

LearnSphere combines multiple open-source technologies and third-party services to provide its full-stack learning experience.

Special thanks to the developers and communities behind:

- React
- Node.js
- Express
- MongoDB
- Redux Toolkit
- Cloudinary
- Razorpay
- AssemblyAI
- Groq
- LangChain
- Xenova Transformers
- OpenAI

---

## LearnSphere

**An AI-assisted learning platform built with the MERN stack.**

**Created by Tanay Gupt**
