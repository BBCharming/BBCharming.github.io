#!/bin/bash

echo "🎯 Mwaba GitHub Repository Fix Script"
echo "======================================"

# Navigate to project directory
cd ~/Projects/Project-1/mwaba

echo ""
echo "📦 Fixing Backend Configuration..."

# Fix backend package.json for ES modules
cat > backend/package.json << 'EOF'
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "description": "Mwaba Backend Server",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js",
    "setup": "node setupMwaba.js && node setupSampleThreads.js"
  },
  "keywords": ["ai", "assistant", "whatsapp"],
  "author": "BBCharming",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "sql.js": "^1.8.0",
    "cors": "^2.8.5"
  }
}
EOF

echo "✅ Fixed backend package.json"

# Create a simple, working server.js
cat > backend/server.js << 'EOF'
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/ping', (req, res) => {
  res.send('🚀 Mwaba Backend is Running!');
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mwaba AI Assistant',
    version: '1.0.0',
    endpoints: {
      health: '/ping',
      whatsapp: '/api/whatsapp/reply'
    }
  });
});

// WhatsApp reply endpoint
app.post('/api/whatsapp/reply', (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'No message provided'
      });
    }

    console.log(`📨 Received message: ${message}`);

    // Simple AI response logic
    const lowerMessage = message.toLowerCase();
    let reply = '';

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      reply = 'Hello! I am Mwaba, your AI assistant. How can I help you today?';
    } else if (lowerMessage.includes('time')) {
      reply = `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (lowerMessage.includes('name')) {
      reply = 'I am Mwaba, your personal AI assistant!';
    } else if (lowerMessage.includes('weather')) {
      reply = 'I cannot check weather yet, but I can help with messages and reminders!';
    } else if (lowerMessage.includes('thank')) {
      reply = 'You are welcome! Is there anything else I can help with?';
    } else {
      reply = `I understand you said: "${message}". How can I assist you further?`;
    }

    res.json({
      success: true,
      reply: reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in /api/whatsapp/reply:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Test endpoint for voice commands
app.post('/api/voice/command', (req, res) => {
  const { command } = req.body;
  
  if (!command) {
    return res.status(400).json({
      success: false,
      error: 'No command provided'
    });
  }

  const response = `Executing command: ${command}`;
  
  res.json({
    success: true,
    response: response,
    action: 'command_received'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mwaba Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/ping`);
  console.log(`💬 API endpoint: http://localhost:${PORT}/api/whatsapp/reply`);
});
EOF

echo "✅ Created working server.js"

echo ""
echo "🔄 Fixing Frontend Configuration..."

# Fix frontend API service
cat > frontend/src/services/api.js << 'EOF'
const BASE_URL = 'http://localhost:3000';

class ApiService {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to connect to backend'
      };
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Specific API methods
  async sendMessage(message) {
    return this.post('/api/whatsapp/reply', { message });
  }

  async sendVoiceCommand(command) {
    return this.post('/api/voice/command', { command });
  }

  async healthCheck() {
    return this.get('/ping');
  }
}

// Create singleton instance
const api = new ApiService();
export default api;
EOF

echo "✅ Fixed frontend API service"

echo ""
echo "🎤 Creating Fixed Voice Assistant Component..."

# Create a robust voice assistant component
cat > frontend/src/components/MwabaVoiceAssistant.jsx << 'EOF'
import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';

const WAKE_WORDS = ["hey mwaba", "mwaba", "hello mwaba", "hello", "hi mwaba"];

export default function MwabaVoiceAssistant() {
  const [awake, setAwake] = useState(false);
  const [listening, setListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [response, setResponse] = useState('');
  const [textInput, setTextInput] = useState('');
  const [status, setStatus] = useState('Initializing...');
  const [voices, setVoices] = useState([]);
  
  const recognitionRef = useRef(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setStatus('Ready - Say "Hey Mwaba"');
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Initialize voice recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setStatus('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log('🎤 Heard:', transcript);

      if (!awake) {
        // Check for wake words
        for (const word of WAKE_WORDS) {
          if (transcript.includes(word)) {
            console.log('✅ Wake word detected:', word);
            setAwake(true);
            setStatus('Awake and listening for command...');
            speakMessage("Hello! I'm listening. What can I do for you?");
            startListeningForCommand();
            break;
          }
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'no-speech') {
        setStatus(`Error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      if (!awake) {
        recognition.start();
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    setStatus('Listening for wake words...');

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [awake]);

  const startListeningForCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = 'en-US';

    setListening(true);

    recognition.onresult = async (event) => {
      const command = event.results[0][0].transcript;
      console.log('🎯 Command received:', command);
      
      setLastCommand(command);
      setListening(false);
      setStatus('Processing command...');

      try {
        const result = await api.sendMessage(command);
        
        if (result.success) {
          setResponse(result.reply);
          speakMessage(result.reply);
          setStatus('Command processed successfully');
        } else {
          setResponse(`Error: ${result.error}`);
          setStatus('Failed to process command');
        }
      } catch (error) {
        setResponse('Failed to connect to Mwaba backend');
        setStatus('Connection error');
      }

      // Return to wake word listening after a delay
      setTimeout(() => {
        setAwake(false);
        setStatus('Ready - Say "Hey Mwaba"');
      }, 3000);
    };

    recognition.onerror = (event) => {
      console.error('Command recognition error:', event.error);
      setListening(false);
      setAwake(false);
      setStatus('Recognition error - Ready for wake words');
    };

    recognition.start();
  };

  const speakMessage = (text) => {
    if (!window.speechSynthesis) {
      console.log('Text-to-speech not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Try to select a pleasant voice
    if (voices.length > 0) {
      // Prefer female voices for Mwaba
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.includes('Google UK Female') ||
        voice.name.includes('Samantha')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else {
        utterance.voice = voices[0];
      }
    }

    utterance.onend = () => {
      console.log('✅ Finished speaking');
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleTextSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!textInput.trim()) return;

    setLastCommand(textInput);
    setStatus('Sending message...');

    try {
      const result = await api.sendMessage(textInput);
      
      if (result.success) {
        setResponse(result.reply);
        speakMessage(result.reply);
        setStatus('Message sent successfully');
      } else {
        setResponse(`Error: ${result.error}`);
        setStatus('Failed to send message');
      }
    } catch (error) {
      setResponse('Failed to connect to Mwaba backend');
      setStatus('Connection error');
    }

    setTextInput('');
  };

  const testBackendConnection = async () => {
    setStatus('Testing backend connection...');
    try {
      const result = await api.healthCheck();
      if (result) {
        setStatus('Backend connection successful!');
        speakMessage("Backend connection is working perfectly!");
      } else {
        setStatus('Backend connection failed');
      }
    } catch (error) {
      setStatus('Backend connection failed');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ color: '#ff3366', textAlign: 'center' }}>Mwaba Voice Assistant</h2>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Mode:</strong> {awake ? '🎯 Command Mode' : '💤 Sleep Mode'}</p>
        {listening && <p style={{ color: '#ff3366' }}>🎤 Listening for your command...</p>}
      </div>

      {lastCommand && (
        <div style={{ marginBottom: '15px' }}>
          <p><strong>Your Command:</strong> {lastCommand}</p>
        </div>
      )}

      {response && (
        <div style={{ 
          background: '#e8f5e8', 
          padding: '15px', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>Mwaba's Response:</strong> {response}</p>
        </div>
      )}

      <form onSubmit={handleTextSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
          <button 
            type="submit"
            style={{
              padding: '10px 20px',
              background: '#ff3366',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Send
          </button>
        </div>
      </form>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={testBackendConnection}
          style={{
            padding: '8px 16px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Backend
        </button>
        
        <button 
          onClick={() => speakMessage('Hello! I am Mwaba, your AI assistant.')}
          style={{
            padding: '8px 16px',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Voice
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>Wake Words:</strong> "Hey Mwaba", "Mwaba", "Hello Mwaba"</p>
        <p><strong>Try saying:</strong> "Hello", "What time is it?", "What's your name?"</p>
      </div>
    </div>
  );
}
EOF

echo "✅ Created robust voice assistant component"

echo ""
echo "⚙️ Creating Environment Configuration..."

# Create .env file
cat > backend/.env << 'EOF'
# Mwaba Backend Configuration
PORT=3000
NODE_ENV=development

# Database
DB_PATH=./db/mwaba.db

# WhatsApp (Future Integration)
WHATSAPP_AUTO_REPLY=true
WHATSAPP_WEBHOOK_URL=

# AI Settings (Future Integration)
OPENAI_API_KEY=your_openai_key_here
AI_MODEL=local

# Security
ADMIN_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:5173
EOF

echo "✅ Created environment configuration"

echo ""
echo "🔧 Creating Setup Script..."

# Create database setup script
cat > backend/setupDb.js << 'EOF'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Setting up Mwaba database...');

// Create db directory if it doesn't exist
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✅ Created db directory');
}

// Create a simple database file marker
const dbFile = path.join(dbDir, 'mwaba.db');
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, '');
  console.log('✅ Created database file');
}

console.log('🎉 Database setup complete!');
console.log('📁 Database location:', dbFile);
EOF

echo "✅ Created database setup script"

echo ""
echo "📋 Creating Startup Instructions..."

# Create startup instructions
cat > START_INSTRUCTIONS.md << 'EOF'
# 🚀 Mwaba Startup Instructions

## Quick Start:

### 1. Start the Backend:
```bash
cd backend
npm install
npm start