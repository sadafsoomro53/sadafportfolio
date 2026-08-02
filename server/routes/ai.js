const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

// AI Assistant Endpoint
router.post('/chat', (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ success: false, message: 'Prompt is required' });
  }

  const db = getDB();
  const profile = db.profile || {};
  const query = prompt.toLowerCase();

  let responseText = "";

  if (query.includes('skill') || query.includes('tech') || query.includes('stack')) {
    responseText = `As a Full-Stack Web Developer & AI Engineer, my core tech stack includes React, Next.js, TypeScript, Node.js, FastAPI, Python, PyTorch, LangChain, Pinecone Vector DB, and PostgreSQL/SQLite.`;
  } else if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
    const featuredTitles = (db.projects || []).slice(0, 3).map(p => p.title).join(', ');
    responseText = `I have built several full-stack and AI projects! Some featured ones include: ${featuredTitles}. You can filter and test them live in the Projects section!`;
  } else if (query.includes('experience') || query.includes('background') || query.includes('education')) {
    responseText = `I have extensive experience architecting full-stack web applications, multi-agent AI systems, and micro-animated responsive frontends. Check out the Experience timeline section for complete details!`;
  } else if (query.includes('hire') || query.includes('contact') || query.includes('email') || query.includes('reach')) {
    responseText = `You can easily reach out to me via the Contact form on this page or direct email at ${profile.email || 'developer@example.com'}. I am available for full-time roles, contracts, and innovative AI engineering projects!`;
  } else {
    responseText = `Hello! I am the AI Assistant for this portfolio. I specialize in Full-Stack Web Development (React, Node.js, Databases) and AI Engineering (LLMs, Computer Vision, FastAPI). How can I assist you with your project needs today?`;
  }

  res.json({
    success: true,
    reply: responseText,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
