const express = require('express');
const router = express.Router();

let cartItems = [];

// Get cart items
router.get('/', (req, res) => {
  res.json(cartItems);
});

// Add to cart
router.post('/add', (req, res) => {
  const item = req.body;
  cartItems.push(item);
  res.json({ message: 'Item added', cartItems });
});

// Remove from cart
router.post('/remove', (req, res) => {
  const { id } = req.body;
  cartItems = cartItems.filter(item => item.id !== id);
  res.json({ message: 'Item removed', cartItems });
});

module.exports = router;
