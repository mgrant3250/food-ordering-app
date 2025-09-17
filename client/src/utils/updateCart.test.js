import { updateCart } from './cartUtils';

describe('updateCart', () => {
  it('adds a new item if not in cart', () => {
    const prevCart = {};
    const item = { name: 'Fries', price: '$2.99' };

    const updated = updateCart(prevCart, item);

    expect(updated).toEqual({
      Fries: { price: '$2.99', quantity: 1 }
    });
  });

  it('increments quantity if item exists', () => {
    const prevCart = {
      Fries: { price: '$2.99', quantity: 1 }
    };
    const item = { name: 'Fries', price: '$2.99' };

    const updated = updateCart(prevCart, item);

    expect(updated).toEqual({
      Fries: { price: '$2.99', quantity: 2 }
    });
  });
});