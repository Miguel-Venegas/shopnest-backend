exports.ensureSufficientStock = (existingItem, product) => {
  if (!existingItem) return true;

  if (existingItem.quantity + 1 > product.stockQuantity) {
    return false;
  }

  return true;
};

