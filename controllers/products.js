const Product = require('../models/Product');

exports.getAllProductsFromAccount = async (req, res) => {
  const products = await Product.find({
    account: req.user.id,
  });

  res.json(products);
};

exports.createProduct = async (req, res) => {
  try {
    const { name } = req.body;


    const existingProduct = await Product.findOne({
      name,
      account: req.user.id
    });

    if (existingProduct) {
      return res.status(409).json({
        error: 'Product with this name already exists for this account',
      });
    }


    const product = await Product.create({
      ...req.body,
      account: req.user.id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleted = await Product.findOneAndDelete({
    _id: id,
    account: req.user.id
  });

  if (!deleted) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(204).end();
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  const updated = await Product.findOneAndUpdate(
    { _id: id, account: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(updated);
};


// public routes

exports.getAllPublicProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("account", "businessName")

    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
};

exports.getPublicProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.category })
      .populate("account", "businessName")
      .select("name price imageUrl stockQuantity description account");

    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: `Failed to fetch products in ${req.query.category} category`,
    });
  }
};






