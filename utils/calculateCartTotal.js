exports.calculateCartTotal = (items) => {
  // I: array, O: numeric value
  return items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
};
