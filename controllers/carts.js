const Cart = require("../models/Cart");
const Product = require("../models/Product");

const { calculateCartTotal } = require("../utils/calculateCartTotal");
const { getValidCartItems } = require("../utils/getValidCartItems");
const {isProductInCart} = require("../utils/isProductInCart");
const {addOrIncrementCartItem} = require("../utils/addOrIncrementStockItem");
const {ensureSufficientStock} = require("../utils/ensureSufficientStock");
const {buildCartResponse} = require("../utils/buildCartResponse");

exports.getCartProducts = async (req, res) => {
  
  try {
    //  Load the cart associated with this request
    const cart = await Cart.findById(req.cart._id)
      .populate("items.product");

    // Defensive check (cart could theoretically be deleted)
    if (!cart) {
      return res.status(404).json({
        items: [],
        total: 0,
      });
    }

    // Send response
    res.json(buildCartResponse(cart));
  } catch (error) {
    console.error("Failed to fetch cart:", error);

    res.status(500).json({
      error: "Failed to load cart",
    });
  }

};


exports.addProductToCart = async (req, res) => {

  const { productId } = req.params;
  const cart = req.cart;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const existingItem = isProductInCart(cart, productId);

  const hasStock = ensureSufficientStock(existingItem, product);

  if (!hasStock) {
    return res.status(400).json({ error: "Insufficient stock" });
  }

  addOrIncrementCartItem(cart, productId, existingItem);

  await cart.save();
  await cart.populate("items.product");

  res.json(buildCartResponse(cart));
};


exports.updateProductQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const cart = req.cart;

  if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be >= 1" });
  }

  const item = isProductInCart(cart, productId);

  if (!item) {
    return res.status(404).json({ error: "Product not in cart" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (quantity > product.stockQuantity) {
    return res.status(400).json({ error: "Insufficient stock" });
  }

  item.quantity = quantity;

  await cart.save();
  await cart.populate("items.product");

  res.json(buildCartResponse(cart));
};

exports.removeProductFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = req.cart;

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  await cart.save();
  await cart.populate("items.product");

  res.json(buildCartResponse(cart));
};

exports.checkout = async (req, res) => {
  const cart = req.cart;

  if (!cart.items.length) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  cart.items = [];
  await cart.save();

  res.json({
    message: "Checkout complete",
    items: [],
    total: 0
  });
};
