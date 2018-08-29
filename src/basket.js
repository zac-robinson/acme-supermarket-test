export class Basket {
  constructor(pricingRules = {}) {
    this.pricingRules = pricingRules;
    this.items = [];
  }

  add(item) {
    const itemIndex = this.items.indexOf(item);
    if (itemIndex !== -1) {
      this.items[itemIndex].quantity++;
    }
    else {
      this.items.push(item);
    }
  }

  total() {
    let totalPrice = 0.0;
    this.items.forEach(item => totalPrice += item.price);
    return totalPrice.toFixed(2);
  }
}