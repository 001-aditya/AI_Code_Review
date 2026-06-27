# AI Code Reviewer Platform

A full-stack AI-powered code review and execution platform. Elevate your development workflow with high-speed execution and AI-driven insights.

## Features

- **Real-time Code Execution**: Run code in JavaScript, Python, and C++ with instant output using Judge0.
- **AI Code Review**: Get deep reviews, bug detection, and performance tips powered by Groq AI (Llama 3.3 70B).
- **Interactive AI Chat**: A ChatGPT-style assistant to discuss your code and IT-related topics.
- **Modern UI**: A premium, responsive design built with React, Tailwind CSS, and Lucide icons.
- **Accessibility**: No login or registration required for immediate access.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Monaco Editor.
- **Backend**: Node.js, Express, Groq SDK.
- **APIs**: Groq AI, Judge0 (Code Execution).

## Installation

### Prerequisites

- Node.js (v18+)
- Groq API Key

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the provided values:
   ```env
   PORT=5000
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend
Deploy the `server` directory to platform like Render, Railway, or Heroku. Ensure you set the `GROQ_API_KEY` in your environment variables.

### Frontend
Deploy the `client` directory to Vercel, Netlify, or GitHub Pages. Ensure you set `VITE_API_URL` to your production backend URL during the build process.

## Domain Restriction
The AI Assistant is strictly programmed to only answer questions related to Information Technology and Software Development.

## License
ISC
