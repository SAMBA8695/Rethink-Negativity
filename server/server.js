const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/reframe', async (req, res) => {
  const { input } = req.body;

  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const lmResponse = await axios.post(
      'http://localhost:1234/v1/chat/completions',
      {
        model: 'mistral-7b-instruct-v0.1',
        messages: [
          {
            role: 'system',
            content: 'You are a compassionate CBT therapist. When given a negative self-thought, you rewrite it into a kinder, healthier, and more constructive response using cognitive behavioral therapy techniques.'
          },
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.7,
        max_tokens: 100
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const rewritten = lmResponse.data.choices[0].message.content.trim();
    res.json({ rewritten });
  } catch (err) {
    console.error('LM Studio Error:', err.message);
    res.status(500).json({ error: 'Error connecting to LM Studio' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

