const processOrder = (order) => {
  if (order == null || !Array.isArray(order.items) || order.items.length === 0) {
    throw new Error("Invalid order: Order must contain at least one item.");
  }

  const total = order.items.reduce((sum, item) => {
    if (typeof item.price !== "number" || isNaN(item.price)) {
      throw new Error("Each item must have a numeric price");
    }
    return sum + item.price;
  }, 0);

  const hasDiscount = total > 100;
  const finalTotal = parseFloat((hasDiscount ? total * 0.9 : total).toFixed(2));

  return {
    originalTotal: parseFloat(total.toFixed(2)),
    finalTotal,
    discountApplied: hasDiscount,
    currency: "USD"
  };
};

module.exports = processOrder;

