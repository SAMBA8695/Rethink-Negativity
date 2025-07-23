🧠 Inner Critic Tamer
A simple React app that helps users reframe their inner negative self-talk into constructive, compassionate responses. It detects inner critic personas, recurring negative themes, and provides rewrites via a local API.

📁 Folder Structure
pgsql
Copy
Edit
inner-critic-tamer/
│
├── public/                  # Static files
│   └── index.html
│
├── src/
│   ├── InnerCriticTamer.jsx # Main React component
│   ├── index.js             # React entry point
│   └── App.jsx              # App wrapper (optional)
│
├── server/
│   └── server.js            # Express backend to handle /api/reframe
│
├── package.json             # Project dependencies
└── README.md                # You're reading it!
🧰 Requirements
Node.js (v16 or later recommended)

npm or yarn

🚀 How to Run It Locally
Clone the Repository

bash
Copy
Edit
git clone https://github.com/your-username/inner-critic-tamer.git
cd inner-critic-tamer
Install Dependencies

bash
Copy
Edit
npm install
Start the Backend Server

In a new terminal window/tab:

bash
Copy
Edit
cd server
node server.js
This runs an Express server on http://localhost:3001.

Start the Frontend App

In the root folder:

bash
Copy
Edit
npm start
This starts the React app at http://localhost:3000.

Interact

Type a negative self-thought.

See the detected "Inner Critic" persona and recurring emotional themes.

Get an AI-generated constructive reframe.

🧠 Features
Detects common critic personas (Perfectionist, Inner Child, etc.)

Highlights recurring negative themes

Sends input to a local Express API for AI reframe

Displays AI and user messages in a styled UI

🛠️ Note
You can modify the detection logic in InnerCriticTamer.jsx and the rewrite logic in server/server.js.

📄 License
MIT License
