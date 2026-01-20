const Cart = require("../models/Cart");

exports.ensureCart = async (req, res, next) => {
  try {
    // 1️Read cartId from cookies
    let { cartId } = req.cookies;

    // If no cartId exists, create a new cart
    if (!cartId) {
      const cart = await Cart.create({ items: [] });
      
      res.cookie("cartId", cart._id.toString(), {
        httpOnly: true,
        sameSite: "lax",
      });

      req.cart = cart;
      return next();
    }

    // cartId exists → try to load cart
    const cart = await Cart.findById(cartId);

    // If cart was deleted or invalid, recreate it
    if (!cart) {
      const newCart = await Cart.create({ items: [] });

      res.cookie("cartId", newCart._id.toString(), {
        httpOnly: true,
        sameSite: "lax",
      });

      req.cart = newCart;
      return next();
    }

    // Cart exists → attach it to request
    req.cart = cart;
    next();
  } catch (error) {
    console.error("ensureCart failed:", error);
    res.status(500).json({ error: "Failed to initialize cart" });
  }
};
