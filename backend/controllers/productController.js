const products = require('../data/products.json');

exports.getAllProducts = (req, res) => {
  res.json(products); // لازم يكون هذا الشكل لو JSON عبارة عن مصفوفة مباشرة
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};


