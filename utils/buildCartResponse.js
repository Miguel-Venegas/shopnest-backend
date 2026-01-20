exports.buildCartResponse = (cart) => {
  const items = cart.items
    .filter(item => item.product)
    .map(item => ({
      product: {
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        imageUrl: item.product.imageUrl
      },
      quantity: item.quantity,
    }));

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return { items, total };
};