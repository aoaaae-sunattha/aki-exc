 const calculateTotal = require('./mathUtils');

describe('calculateTotal', () => {
  // Happy path
  it('calculates total with tax correctly', () => {
    expect(calculateTotal(100, 0.1)).toBeCloseTo(110);
  });

  it('calculates total with zero tax rate', () => {
    expect(calculateTotal(50, 0)).toBe(50);
  });

  it('calculates total with decimal price', () => {
    expect(calculateTotal(19.99, 0.08)).toBeCloseTo(21.5892);
  });

  // Edge cases
  it('handles price of zero', () => {
    expect(calculateTotal(0, 0.2)).toBe(0);
  });

  it('handles tax rate of 1 (100%)', () => {
    expect(calculateTotal(200, 1)).toBe(400);
  });

  it('handles negative price', () => {
    expect(calculateTotal(-50, 0.1)).toBeCloseTo(-55);
  });

  it('handles very large numbers', () => {
    expect(calculateTotal(1e9, 0.05)).toBeCloseTo(1.05e9);
  });

  // Error cases
  it('throws if price is not a number', () => {
    expect(() => calculateTotal('100', 0.1)).toThrow('Inputs must be numbers');
  });

  it('throws if taxRate is not a number', () => {
    expect(() => calculateTotal(100, '0.1')).toThrow('Inputs must be numbers');
  });

  it('throws if both inputs are non-numbers', () => {
    expect(() => calculateTotal(null, undefined)).toThrow('Inputs must be numbers');
  });

  it('throws if price is undefined', () => {
    expect(() => calculateTotal(undefined, 0.1)).toThrow('Inputs must be numbers');
  });
});
