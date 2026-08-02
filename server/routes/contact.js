const express = require('express');
const router = express.Router();
const { getDB, saveDB } = require('../db');

// POST submit contact message
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  const db = getDB();
  db.contactMessages = db.contactMessages || [];

  const newMessage = {
    id: Date.now().toString(),
    name,
    email,
    subject: subject || 'General Inquiry',
    message,
    timestamp: new Date().toISOString(),
    read: false
  };

  db.contactMessages.unshift(newMessage);
  saveDB(db);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been stored in the database successfully.'
  });
});

// GET all contact messages (Admin view)
router.get('/', (req, res) => {
  const db = getDB();
  res.json({
    success: true,
    count: (db.contactMessages || []).length,
    data: db.contactMessages || []
  });
});

module.exports = router;
