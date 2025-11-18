import { updateCart } from './cartUtils';

describe('updateCart', () => {
  it('adds a new item if not in cart', () => {
    const prevCart = {};
    const item = { name: 'Fries', price: 2.99 };
    const menu = { sides: [] };

    const updated = updateCart(prevCart, item, null, null, menu);

    expect(updated).toEqual({
      'Fries | Side: None | Drink: None': {
        price: 2.99,
        quantity: 1,
        baseItem: 'Fries',
        side: null,
        drink: null,
      }
    });
  });

  it('increments quantity if item exists', () => {
    const prevCart = {
      'Fries | Side: None | Drink: None': {
        price: 2.99,
        quantity: 1,
        baseItem: 'Fries',
        side: null,
        drink: null
      }
    };
    const item = { name: 'Fries', price: 2.99 };
    const menu = { sides: [] };

    const updated = updateCart(prevCart, item, null, null, menu);

    expect(updated).toEqual({
      'Fries | Side: None | Drink: None': {
        price: 2.99,
        quantity: 2,
        baseItem: 'Fries',
        side: null,
        drink: null
      }
    });
  });
});