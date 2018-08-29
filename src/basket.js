export class Basket {
  constructor(pricingRules = {}) {
    this.pricingRules = pricingRules;
    this.items = [];
  }

  add(item) {
    const itemIndex = this.items.indexOf(item);
    if (itemIndex !== -1) {
      this.items[itemIndex].quantity++;
    } else {
      item.quantity = 1;
      this.items.push(item);
    }
  }

  total() {
    let totalPrice = 0.0;
    this.items.forEach(item => {
      totalPrice += this.applyOffer(item, this.pricingRules)
    });
    return totalPrice.toFixed(2);
  }

  applyOffer(item, pricingRules) {
    const currentPrice = item.price * item.quantity;
    let offerPrice = 0;
    if (pricingRules[item.productCode] === 'bogof') {
      if (item.quantity % 2 === 0) {
        offerPrice = currentPrice / 2;
      } else {
        offerPrice = ((currentPrice - item.price) / 2) + item.price;
      }
    } else if (pricingRules[item.productCode] === 'bulk' && item.quantity >= 3) {
      const SR1Price = 4.5;
      offerPrice = SR1Price * item.quantity;
    } else {
      offerPrice = currentPrice;
    }
    return offerPrice;
  }
}