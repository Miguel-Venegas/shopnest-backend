exports.isProductInCart = (cart, productId) => {
  return cart.items.find(
    item => item.product.toString() === productId
  );
};
