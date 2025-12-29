const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const users = require('../data/users.json'); // Array of users

// تسجيل الدخول
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// تسجيل مستخدم جديد (dummy, يضاف فقط في الذاكرة)
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const exist = users.find(u => u.username === username);
  if (exist) return res.status(400).json({ message: 'Username already exists' });

  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.json({ message: 'Signup successful', user: newUser });
});

module.exports = router;




