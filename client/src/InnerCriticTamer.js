import { useState } from 'react';
import './InnerCriticTamer.css';

// Detects common inner critic personas
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

// Extracts recurring themes (trigger pattern tracker)
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
    <div className="tamer-container">
      <h1 className="tamer-title">Inner Critic Tamer</h1>
      <p className="tamer-subtitle">Turn your inner negative thoughts into constructive affirmations.</p>

      {persona && (
        <div className="tamer-persona-box">
          <strong>Inner Critic Persona:</strong> {persona}
        </div>
      )}

      {themes.length > 0 && (
        <div className="tamer-theme-box">
          <strong>Recurring Themes:</strong> {themes.join(', ')}
        </div>
      )}

      <div className="tamer-chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`tamer-message ${msg.type}`}>{msg.text}</div>
        ))}
      </div>

      <textarea
        rows="4"
        className="tamer-input"
        placeholder="What's your inner critic saying today?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="tamer-button" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Reframing...' : 'Reframe Thought'}
      </button>
    </div>
  );
}

