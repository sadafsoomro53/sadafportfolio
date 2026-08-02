const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDB, saveDB } = require('./db');

const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');
const aiRouter = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/ai', aiRouter);

// Profile API
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

// Full Portfolio Aggregated Data Endpoint
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', mode: 'Full-Stack Express API + Database Active', timestamp: new Date().toISOString() });
});

// Serve frontend build in production if available
const frontendBuild = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendBuild));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  const indexPath = path.join(frontendBuild, 'index.html');
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({ message: 'Backend Server active on Port ' + PORT + '. Frontend dev server running on Vite.' });
  }
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Full-Stack Portfolio Server running on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api/portfolio`);
  console.log(`====================================================`);
});
