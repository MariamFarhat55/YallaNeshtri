const users = require('../data/users.json');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
};

exports.signup = (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = { id: users.length + 1, username, password };
  users.push(newUser); // لو تعمل نسخة حقيقية استخدم قاعدة بيانات
  res.json({ message: 'Signup successful', user: newUser });
};
