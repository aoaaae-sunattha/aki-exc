const calculateTotal = require('./mathUtils');

test('adds correct tax to price', () => {
  expect(calculateTotal(10, 0.1)).toBe(11);
});

test('fails on price of 100 due to deliberate bug', () => {
  expect(calculateTotal(100, 0.1)).toBe(110);
});
