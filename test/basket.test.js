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
    productCode: 'CF1',
    productName: 'Coffee',
    price: 11.23,
    quantity: 1
  }
]

const pricingRules = {
  FR1: 'bogof',
  SR1: 'bulk'
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
        FR1: 'bogof',
        SR1: 'bulk'
      };

      assert.isObject(basket.pricingRules);
      expect(basket.pricingRules).to.deep.equal(expectedPriceRules);
    });

    it('should calculate correct total if you add 1 FR1 items to the basket with BOGOF', () => {
      const basket = new Basket(pricingRules);
      const FR1 = {
        productCode: 'FR1',
        productName: 'Fruit Tea',
        price: 3.11,
        quantity: 1
      };

      basket.add(FR1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '3.11')
    });

    it('should calculate correct total if you add 2 FR1 products to the basket with BOGOF', () => {
      const basket = new Basket(pricingRules);
      const FR1 = {
        productCode: 'FR1',
        productName: 'Fruit Tea',
        price: 3.11,
        quantity: 1
      };

      basket.add(FR1);
      basket.add(FR1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '3.11')
    });

    it('should calculate correct total if you add 3 FR1 items to the basket with BOGOF', () => {
      const basket = new Basket(pricingRules);
      const FR1 = {
        productCode: 'FR1',
        productName: 'Fruit Tea',
        price: 3.11,
        quantity: 1
      };

      basket.add(FR1);
      basket.add(FR1);
      basket.add(FR1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '6.22')
    });

    it('should calculate correct total if you add 4 FR1 items to the basket with BOGOF', () => {
      const basket = new Basket(pricingRules);
      const FR1 = {
        productCode: 'FR1',
        productName: 'Fruit Tea',
        price: 3.11,
        quantity: 1
      };

      basket.add(FR1);
      basket.add(FR1);
      basket.add(FR1);
      basket.add(FR1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '6.22')
    });

    it('should calculate correct total if you add 1 SR1 items to the basket with bulk offer', () => {
      const basket = new Basket(pricingRules);
      const SR1 = {
        productCode: 'SR1',
        productName: 'Strawberries',
        price: 5.00,
        quantity: 1
      };

      basket.add(SR1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '5.00')
    });

    it('should calculate correct total if you add 2 SR1 products to the basket with bulk offer', () => {
      const basket = new Basket(pricingRules);
      const SR1 = {
        productCode: 'SR1',
        productName: 'Strawberries',
        price: 5.00,
        quantity: 1
      };

      basket.add(SR1);
      basket.add(SR1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '10.00')
    });

    it('should calculate correct total if you add 3 SR1 items to the basket with bulk offer', () => {
      const basket = new Basket(pricingRules);
      const SR1 = {
        productCode: 'SR1',
        productName: 'Strawberries',
        price: 5.00,
        quantity: 1
      };

      basket.add(SR1);
      basket.add(SR1);
      basket.add(SR1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '13.50')
    });

    it('should calculate correct total if you add 4 SR1 items to the basket with bulk offer', () => {
      const basket = new Basket(pricingRules);
      const SR1 = {
        productCode: 'SR1',
        productName: 'Strawberries',
        price: 5.00,
        quantity: 1
      };

      basket.add(SR1);
      basket.add(SR1);
      basket.add(SR1);
      basket.add(SR1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '18.00')
    });

    it('should calculate correct total if you add 1 CF1 items to the basket with no offer', () => {
      const basket = new Basket(pricingRules);
      const CF1 = {
        productCode: 'CF1',
        productName: 'Coffee',
        price: 11.23,
        quantity: 1
      };

      basket.add(CF1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '11.23')
    });

    it('should calculate correct total if you add 2 CF1 products to the basket with no offer', () => {
      const basket = new Basket(pricingRules);
      const CF1 = {
        productCode: 'CF1',
        productName: 'Coffee',
        price: 11.23,
        quantity: 1
      };

      basket.add(CF1);
      basket.add(CF1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '22.46')
    });

    it('should calculate correct total if you add 3 CF1 products to the basket with no offer', () => {
      const basket = new Basket(pricingRules);
      const CF1 = {
        productCode: 'CF1',
        productName: 'Coffee',
        price: 11.23,
        quantity: 1
      };

      basket.add(CF1);
      basket.add(CF1);
      basket.add(CF1);

      assert.strictEqual(basket.items.length, 1);
      assert.strictEqual(basket.total(), '33.69')
    });
  });

  describe('Using test data', () => {
    it('should show correct price for basket: FR1, SR1, FR1, CF1', () => {
      const basket = new Basket(pricingRules);
      const CF1 = {
        productCode: 'CF1',
        productName: 'Coffee',
        price: 11.23,
        quantity: 1
      };
      const SR1 = {
        productCode: 'SR1',
        productName: 'Strawberries',
        price: 5.00,
        quantity: 1
      };
      const FR1 = {
        productCode: 'FR1',
        productName: 'Fruit Tea',
        price: 3.11,
        quantity: 1
      };

      basket.add(FR1);
      basket.add(SR1);
      basket.add(FR1);
      basket.add(CF1);

      assert.strictEqual(basket.total(), '19.34');
    });

    it('should show correct price for basket: FR1, FR1', () => {
      const basket = new Basket(pricingRules);
      const FR1 = {
        productCode: 'FR1',
        productName: 'Fruit Tea',
        price: 3.11,
        quantity: 1
      };

      basket.add(FR1);
      basket.add(FR1);

      assert.strictEqual(basket.total(), '3.11');
    });

    it('should show correct price for basket: SR1, SR1, FR1, SR1', () => {
      const basket = new Basket(pricingRules);
      const FR1 = {
        productCode: 'FR1',
        productName: 'Fruit Tea',
        price: 3.11,
        quantity: 1
      };

      const SR1 = {
        productCode: 'SR1',
        productName: 'Strawberries',
        price: 5.00,
        quantity: 1
      };

      basket.add(SR1);
      basket.add(SR1);
      basket.add(FR1);
      basket.add(SR1);

      assert.strictEqual(basket.total(), '16.61');
    });
})
});

