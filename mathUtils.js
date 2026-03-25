// mathUtils.js
function calculateTotal(price, taxRate) {
  if (typeof price !== 'number' || typeof taxRate !== 'number') {
    throw new Error("Inputs must be numbers");
  }
  
  return price + (price * taxRate);
}

module.exports = calculateTotal;
