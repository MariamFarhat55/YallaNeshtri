const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'Server running', status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




