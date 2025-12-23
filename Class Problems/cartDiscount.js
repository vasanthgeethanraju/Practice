// Goal: Strategy pattern again but with richer behavior.

// Create:

// Base class Coupon with method apply(total)

// Subclasses:

// PercentageCoupon(percentage)

// MinPurchaseCoupon(minAmount, discount) → applies discount only if total >= minAmount

// Cart:

// add(price) to add item price

// setCoupon(coupon)

// total() → applies coupon if present
class Coupon {
  apply(total) {
    return 0;
  }
}
class PercentageCoupon extends Coupon{
  constructor(percentage) {
    super();
    this.percentage = percentage;
  }
  apply(total){
    return (this.percentage/100) * total;
  }
}

class MinPurchaseCoupon extends Coupon{
  constructor(amount, discount) {
    super();
    this.amount = amount;
    this.discount = discount;
  }
  apply(total) {
    // return (total >= this.amount) ? this.discount : 0
    if (total >= this.amount) {
      return this.discount;
    } else {
      return 0;
    }
  }
}

class Cart {
  constructor () {
    this.totalAmount = 0;
    this.coupon = null;
  }
  add(price) {
    this.totalAmount = (this.totalAmount || 0) + price;
  }
  setCoupon(coupon) {
    this.coupon = coupon;
  }
  total() {
    // return this.totalAmount;
    // Calculate the total, apply the coupon if present
    if (this.coupon) {
      return this.totalAmount - this.coupon.apply(this.totalAmount);
    }
    return this.totalAmount;
  }
}


// Input:

const cart = new Cart();
cart.add(200);
cart.add(300); // total = 500

cart.setCoupon(new PercentageCoupon(10));
console.log(cart.total());

cart.setCoupon(new MinPurchaseCoupon(600, 100));
console.log(cart.total());


// Expected output:

// 450   // 10% off 500
// 500 