const express = require('express');
const router = express.Router();

let messages = [];

// Send contact message
router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  messages.push({ id: messages.length + 1, name, email, message });
  res.json({ message: 'Message received', messages });
});

module.exports = router;
