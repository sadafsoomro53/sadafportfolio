import React, { useState } from 'react';
import { Bot, Send, Sparkles, Code2, Terminal, RefreshCw } from 'lucide-react';
import { sendAIChatQuery } from '../api';

export default function AIShowcase() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am the portfolio AI Assistant. Ask me anything about my full-stack architecture, machine learning models, tech stack, or availability!'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    "What is your core tech stack?",
    "Tell me about your AI projects",
    "How do I hire or contact you?",
    "Show me your database background"
  ];

  const handleSend = async (textToSend) => {
    const queryText = textToSend || prompt;
    if (!queryText.trim() || loading) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: queryText }];
    setMessages(newMessages);
    setPrompt('');
    setLoading(true);

    try {
      const res = await sendAIChatQuery(queryText);
      setMessages([...newMessages, { sender: 'ai', text: res.reply || "API response received successfully." }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'ai', text: "Unable to reach AI Backend API. Please check server connection." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-lab" style={{ padding: '6rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            color: 'var(--primary-yellow)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Sparkles size={16} /> INTERACTIVE AI LAB & API ENDPOINT
          </span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
            Ask My <span className="yellow-glow-text">AI Assistant</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Test this live AI assistant connected directly to the Express.js Backend API endpoint.
          </p>
        </div>

        {/* Chat Widget Glass Container */}
        <div className="glass-card" style={{
          padding: '1.75rem',
          borderColor: 'rgba(250, 204, 21, 0.3)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '1rem',
            marginBottom: '1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#070A0F'
              }}>
                <Bot size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>AI Portfolio Assistant API</h4>
                <span style={{ fontSize: '0.75rem', color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80' }} />
                  Express REST API Online
                </span>
              </div>
            </div>
            <span className="tag-pill">POST /api/ai/chat</span>
          </div>

          {/* Messages Area */}
          <div style={{
            minHeight: '220px',
            maxHeight: '340px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            paddingRight: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '0.85rem 1.25rem',
                  borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  background: msg.sender === 'user' ? 'var(--primary-yellow)' : 'rgba(15, 23, 42, 0.9)',
                  color: msg.sender === 'user' ? '#070A0F' : 'var(--text-main)',
                  fontWeight: msg.sender === 'user' ? 600 : 400,
                  border: msg.sender === 'ai' ? '1px solid var(--border-color)' : 'none',
                  fontSize: '0.95rem',
                  lineHeight: 1.5
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--primary-yellow)' }}>
                <RefreshCw size={16} className="animate-spin" />
                <span style={{ fontSize: '0.85rem' }}>AI Processing Query...</span>
              </div>
            )}
          </div>

          {/* Sample Prompts */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                style={{
                  background: 'rgba(250, 204, 21, 0.08)',
                  border: '1px solid rgba(250, 204, 21, 0.2)',
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--primary-yellow)';
                  e.target.style.color = 'var(--primary-yellow)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(250, 204, 21, 0.2)';
                  e.target.style.color = 'var(--text-muted)';
                }}
              >
                "{p}"
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ display: 'flex', gap: '0.75rem' }}
          >
            <input
              type="text"
              placeholder="Ask a question about skills, projects, or AI engineering..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{
                flexGrow: 1,
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                background: 'rgba(7, 10, 15, 0.9)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.85rem 1.5rem' }}>
              <Send size={18} />
              <span>Send</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
