// src/components/InnerCriticTamer.jsx

import { useState } from 'react';
import './InnerCriticTamer.css'; // optional, you can remove if using Tailwind

function detectCriticPersona(input) {
  const patterns = [
    { type: 'Perfectionist', keywords: ['perfect', 'never good enough', 'mistake', 'flaw', 'fail'] },
    { type: 'Inner Child', keywords: ['no one loves me', 'alone', 'not safe', 'abandoned'] },
    { type: 'Pessimist', keywords: ['never work', 'hopeless', 'pointless', 'always goes wrong'] },
    { type: 'Guilt-Tripper', keywords: ['should', 'my fault', 'regret', 'guilty'] },
  ];
  for (let p of patterns) {
    if (p.keywords.some(word => input.toLowerCase().includes(word))) {
      return p.type;
    }
  }
  return 'Unknown Critic';
}

function detectThemes(messages) {
  const allText = messages.filter(m => m.type === 'user').map(m => m.text).join(' ').toLowerCase();
  const themes = [
    { theme: 'Fear of Failure', keywords: ['fail', 'mistake', 'not good', 'never succeed'] },
    { theme: 'Social Anxiety', keywords: ['they hate me', 'awkward', 'embarrassed', 'judging me'] },
    { theme: 'Low Self-Worth', keywords: ['worthless', 'not enough', 'useless', 'burden'] },
  ];
  return themes.filter(t => t.keywords.some(k => allText.includes(k))).map(t => t.theme);
}

export default function InnerCriticTamer() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [themes, setThemes] = useState([]);
  const [persona, setPersona] = useState(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const detectedPersona = detectCriticPersona(input);
    setPersona(detectedPersona);

    const updatedMessages = [...messages, userMessage];
    const newThemes = detectThemes(updatedMessages);
    setThemes(newThemes);

    try {
      const res = await fetch('http://localhost:3001/api/reframe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      const aiMessage = { type: 'ai', text: data.rewritten };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMsg = { type: 'ai', text: 'Error connecting to server.' };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600">🧠 Inner Critic Tamer</h1>
      <p className="text-center text-gray-600">Turn your inner negative thoughts into constructive affirmations.</p>

      {persona && (
        <div className="p-4 bg-indigo-100 text-indigo-800 rounded-md border border-indigo-300">
          <strong>Inner Critic Persona:</strong> {persona}
        </div>
      )}

      {themes.length > 0 && (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md border border-yellow-300">
          <strong>Recurring Themes:</strong> {themes.join(', ')}
        </div>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto border p-4 rounded-md bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${
              msg.type === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <textarea
        rows="4"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="What's your inner critic saying today?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Reframing...' : 'Reframe Thought'}
      </button>
    </div>
  );
}

