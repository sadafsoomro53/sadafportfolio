const express = require('express');
const router = express.Router();
const { getDB, saveDB } = require('../db');

// GET all projects
router.get('/', (req, res) => {
  const db = getDB();
  const { category, search } = req.query;
  let projects = db.projects || [];

  if (category && category !== 'All') {
    projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    projects = projects.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      (p.tech && p.tech.some(t => t.toLowerCase().includes(q)))
    );
  }

  res.json({ success: true, count: projects.length, data: projects });
});

// GET single project by ID
router.get('/:id', (req, res) => {
  const db = getDB();
  const project = (db.projects || []).find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.json({ success: true, data: project });
});

// POST add new project
router.post('/', (req, res) => {
  const db = getDB();
  const { title, description, category, tech, github, demo, image, featured } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'Title and Description are required' });
  }

  const newProject = {
    id: Date.now().toString(),
    title,
    description,
    category: category || 'Full Stack',
    tech: Array.isArray(tech) ? tech : (tech ? tech.split(',').map(s => s.trim()) : ['React', 'Node.js']),
    github: github || 'https://github.com',
    demo: demo || '#',
    featured: featured || false,
    image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'
  };

  db.projects = db.projects || [];
  db.projects.unshift(newProject);
  saveDB(db);

  res.status(201).json({ success: true, message: 'Project added successfully to Database', data: newProject });
});

// PUT update project
router.put('/:id', (req, res) => {
  const db = getDB();
  const index = (db.projects || []).findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  const updated = { ...db.projects[index], ...req.body };
  if (typeof req.body.tech === 'string') {
    updated.tech = req.body.tech.split(',').map(s => s.trim());
  }

  db.projects[index] = updated;
  saveDB(db);

  res.json({ success: true, message: 'Project updated in Database', data: updated });
});

// DELETE project
router.delete('/:id', (req, res) => {
  const db = getDB();
  const initialLen = (db.projects || []).length;
  db.projects = (db.projects || []).filter(p => p.id !== req.params.id);

  if (db.projects.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  saveDB(db);
  res.json({ success: true, message: 'Project deleted from Database' });
});

module.exports = router;
