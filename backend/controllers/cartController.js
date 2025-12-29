let cart = [];

exports.getCart = (req, res) => {
  res.json({ cart }); // رجاع object فيه حقل cart
};

exports.addToCart = (req, res) => {
  console.log('Received add to cart request:', req.body);
  const product = req.body;
  if (!cart.find(item => item.id === product.id)) {
    cart.push(product);
    console.log('Updated cart:', cart);
    res.json({ success: true, message: "Added to cart", cart });
  } else {
    res.status(400).json({ success: false, message: "Item already in cart" });
  }
};

exports.removeFromCart = (req, res) => {
  console.log('Received remove from cart request for id:', req.params.id);
  const { id } = req.params;
  cart = cart.filter(item => item.id !== id);
  console.log('Updated cart:', cart);
  res.json({ success: true, message: "Removed from cart", cart });
};