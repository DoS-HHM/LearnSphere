
# LearnSphere – Online Learning & Course Management Platform

LearnSphere is a full-stack MERN application designed to support online learning through course management, student enrollment, progress tracking, and AI-assisted learning features.

## Features

- **Role-Based Access:** Separate Student, Instructor, and Admin roles with role-specific permissions.
- **Course Management:** Create and manage courses, enroll in courses, track learning progress, and submit ratings and reviews.
- **Authentication & Security:** JWT authentication, email OTP verification, password reset, and role-based access control.
- **Online Payments:** Razorpay integration for course payments with server-side payment verification.
- **Media Storage:** Cloudinary integration for course thumbnails and lecture videos.
- **AI-Assisted Learning:** Lecture transcription, lecture-based Q&A, AI-generated quizzes, and lecture notes using Groq and related AI tools.

## Tech Stack

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payments:** Razorpay
- **Media Storage:** Cloudinary
- **AI Integration:** Groq API, AssemblyAI, embeddings, and MongoDB Vector Search
- **Authentication:** JWT

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database
- API credentials for the external services used by the application

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd LearnSphere
   ```

2. Install the dependencies:

   Follow the project structure and install dependencies in the relevant frontend and backend directories:

   ```bash
   npm install
   ```

3. Configure the required environment variables in the appropriate `.env` file(s). Refer to the project's environment configuration or `.env.example` file, if available.

4. Start the frontend and backend using the development scripts defined in their respective `package.json` files.

5. Open the local URL displayed by the frontend development server.

**Note:** Database access and third-party features require valid credentials and appropriate configuration. Never commit API keys, passwords, or other secrets to GitHub.

## Future Improvements

- Add automated tests for core application workflows.
- Improve error handling and user feedback.
- Further enhance the AI-assisted learning experience.
