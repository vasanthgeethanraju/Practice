class ShoppingCart {
  constructor() {
    this.totalItems = new Map();
    this.discount = { type: "flat", value: 0 };
  }
  addItem(item) {
    if (this.totalItems.has(item.id)) {
      const existingItem = this.totalItems.get(item.id);

      existingItem.quantity += item.quantity;
    } else {
      this.totalItems.set(item.id, item);
    }
  }
  removeItem(id) {
    if(!this.totalItems.has(id)) {
      throw new Error("ID not found");
    }
    this.totalItems.delete(id); 
  }
  updateQuantity(id, quantity) {
    if(!this.totalItems.has(id)) {
      throw new Error("ID not found to update");
    }
    const updateItem = this.totalItems.get(id);

    if(quantity > 0) {
      updateItem.quantity = quantity;
    } else {
      this.totalItems.delete(id);
    }
  }
  getTotal() {
    let total = 0;

    for (const item of this.totalItems.values()) {
      total += item.price * item.quantity;
    }

    return total;
  }
  getMostExpensiveItem() {
    const totalItems = [...this.totalItems.values()];
    if (!totalItems.length) return null;

    return totalItems.reduce((acc, item) => {
      return item.price > acc.price ? item : acc;
    });
  }
  getItemsByPriceRange(min, max) {
    const totalItems = [...this.totalItems.values()];
    if (!totalItems.length) return [];

    return totalItems.filter(item => item.price >= min && item.price <= max);
  }
  applyDiscount(discount) {
    if(discount === "SAVE10") {
      this.discount = { type: "percent", value: 10/100 };
    } else if(discount === "SAVE20") {
      this.discount = { type: "percent", value: 20/100 };
    } else if(discount === "FLAT15") {
      this.discount = { type: "flat", value: 15 };
    } else {
      throw new Error ("Invalid Discount Code");
    }
  }
  checkout() {
    const subtotal = this.getTotal(),
          discount = this.discount.type === "percent" ? subtotal * this.discount.value : this.discount.value,
          total    = Math.max(0, subtotal - discount),
          checkout = {
                      items : [...this.totalItems.values()],
                      subtotal,
                      discount,
                      total
                     };

    // Emptying the cart after checkout
    this.discount = { type: "flat", value: 0 } ;
    this.totalItems.clear();

    return checkout;
  }
}


const cart = new ShoppingCart();

cart.addItem({ id: 1, name: "Laptop", price: 999.99, quantity: 1 });
cart.addItem({ id: 2, name: "Mouse", price: 29.99, quantity: 2 });
cart.addItem({ id: 1, name: "Laptop", price: 999.99, quantity: 1 }); // quantity becomes 2

console.log(cart.getTotal()); // 2059.96
console.log(cart.getMostExpensiveItem());
console.log(cart.getItemsByPriceRange(20,1000));

cart.applyDiscount("SAVE20");
cart.applyDiscount("SAVE10");
console.log(cart.checkout());
// {
//   items: [...],
//   subtotal: 2059.96,
//   discount: 205.996,
//   total: 1853.964
// }