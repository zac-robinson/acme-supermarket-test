import { Basket } from '../src/basket';
import { assert, expect } from 'chai';

const storeItems = [
  {
    productCode: 'FR1',
    productName: 'Fruit Tea',
    price: 3.11,
    quantity: 1
  },
  {
    productCode: 'SR1',
    productName: 'Strawberries',
    price: 5.00,
    quantity: 1
  },
  {
    productCode: 'CR1',
    productName: 'Coffee',
    price: 11.23,
    quantity: 1
  }
]

const pricingRules = {
  bogof: 'FR1',
  bulkBuy: 'SR1'
}

describe('Basket', () => {
  describe('No pricing rules', () => {
    it('should have no pricing rules when no rules are passed in', () => {
      const basket = new Basket();
      assert.isObject(basket.pricingRules);
      expect(basket.pricingRules).to.be.empty;
    });

    it('should total 0.00 on an empty basket', () => {
      const basket = new Basket();
      assert.strictEqual(basket.total(), '0.00');
    });

    it('should add an item to the basket', () => {
      const basket = new Basket();

      const product = {
        productCode: 'PR1',
        productName: 'test',
        price: 42,
        quantity:1
      }

      basket.add(product);
      assert.strictEqual(basket.items.length, 1);
    });

    it('should add an item to the basket and return the correct total', () => {
      const basket = new Basket();

      const product = {
        productCode: 'PR1',
        productName: 'test',
        price: 42,
        quantity:1
      }

      basket.add(product);
      assert.strictEqual(basket.total(), '42.00');
    });

    it('should add many items to the basket', () => {
      const basket = new Basket();

      storeItems.forEach(item => basket.add(item));
      assert.strictEqual(basket.items.length, 3);
    });

    it('should add many identical items to the basket and increase quantity', () => {
      const basket = new Basket();

      const product = {
        productCode: 'PR1',
        productName: 'test',
        price: 42,
        quantity:1
      }
      basket.add(product);
      basket.add(product);
      basket.add(product);
      basket.add(product);
      basket.add(product);
      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.items[0].quantity, 5);
    });

    it('should add many items to the basket and return the correct total', () => {
      const basket = new Basket();

      storeItems.forEach(item => basket.add(item));
      assert.strictEqual(basket.total(), '19.34');
    });
  });

  describe('With pricing rules', () => {
    it('should contain pricing rules when they are supplied', () => {
      const basket = new Basket(pricingRules);
      const expectedPriceRules = {
        bogof: 'FR1',
        bulkBuy: 'SR1'
      };

      assert.isObject(basket.pricingRules);
      expect(basket.pricingRules).to.deep.equal(expectedPriceRules);
    });
  })
})

