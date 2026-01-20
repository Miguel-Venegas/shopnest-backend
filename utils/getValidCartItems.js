exports.getValidCartItems = (cart) => {
  if (!cart || !Array.isArray(cart.items)) {
    return [];
  }

  const invalidItems = cart.items.filter(item => !item.product);

  if (invalidItems.length > 0) {
    console.warn("Cart has invalid items:", invalidItems);
  }

  return cart.items.filter(item => item.product);
};
