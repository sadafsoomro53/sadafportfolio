const express = require('express');
const cors = require('cors');
const { getDB, saveDB } = require('../server/db');

const projectsRouter = require('../server/routes/projects');
const contactRouter = require('../server/routes/contact');
const aiRouter = require('../server/routes/ai');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/ai', aiRouter);

app.get('/api/profile', (req, res) => {
  const db = getDB();
  res.json({ success: true, data: db.profile });
});

app.put('/api/profile', (req, res) => {
  const db = getDB();
  db.profile = { ...db.profile, ...req.body };
  saveDB(db);
  res.json({ success: true, message: 'Profile updated in database', data: db.profile });
});

app.get('/api/portfolio', (req, res) => {
  const db = getDB();
  res.json({
    success: true,
    data: {
      profile: db.profile,
      skills: db.skills,
      projects: db.projects,
      experience: db.experience
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'online', mode: 'Vercel Serverless Function Active', timestamp: new Date().toISOString() });
});

module.exports = app;
