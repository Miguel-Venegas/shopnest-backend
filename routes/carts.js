const express = require('express');
const router = express.Router();
const { ensureCart } = require("../middleware/ensureCart");
const {generalLimiter} = require('../middleware/rateLimiters');
const {
  getCartProducts,
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
  checkout
} = require("../controllers/carts");



// POST /api/checkout
router.post("/checkout", ensureCart, generalLimiter, checkout);


router.get("/products", ensureCart, getCartProducts);
router.post("/products/:productId", ensureCart, addProductToCart);
router.patch("/products/:productId", ensureCart, updateProductQuantity);
router.delete("/products/:productId", ensureCart, removeProductFromCart);

module.exports = router;