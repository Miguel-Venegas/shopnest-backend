exports.addOrIncrementCartItem = (cart, productId, existingItem) => {
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product: productId, quantity: 1 });
  }
};
