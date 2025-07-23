# 🧠 Inner Critic Tamer

A simple React-based emotional coaching tool that helps reframe negative self-talk using cognitive behavioral patterns and persona/theme detection.

## 💡 Overview

This app helps users:
- Detect the kind of **inner critic** (e.g., Perfectionist, Guilt-Tripper).
- Identify recurring **emotional themes** in their input.
- Reframe negative thoughts into constructive affirmations using a backend API.

## 🗂️ Project Structure

root/
├── public/
│ └── index.html # Main HTML file
├── src/
│ ├── InnerCriticTamer.jsx # Main React component (core logic)
│ ├── index.js # React entry point
│ └── App.js # Mounts InnerCriticTamer
├── package.json # Project metadata and dependencies
└── README.md # This file

bash
Copy
Edit

> 💡 The `InnerCriticTamer.css` file is now deprecated and can be safely deleted.

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/inner-critic-tamer.git
cd inner-critic-tamer
2. Install dependencies
bash
Copy
Edit
npm install
3. Start the frontend
bash
Copy
Edit
npm start
The React app will run at http://localhost:3000

4. Start the backend (if applicable)
This project expects a backend at:

bash
Copy
Edit
http://localhost:3001/api/reframe
Make sure your backend returns a response like:

json
Copy
Edit
{ "rewritten": "Your reframed thought here." }
