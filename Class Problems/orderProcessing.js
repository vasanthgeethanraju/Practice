// 6️⃣ Order Processing Pipeline (Composition + Small Workflow)
// Goal: Chain multiple collaborating classes.
// Create classes:
// OrderValidator: validate(order) → returns true or false
// OrderPricing: calculateTotal(order) → uses items and price
// OrderService: uses both validator + pricing
// placeOrder(order): if invalid → returns "INVALID" else → returns "TOTAL: <amount>"

class OrderValidator {
  validate(order) {
    if(!order || order.items.length === 0 || !Array.isArray(order.items)) {
      return false;
    }

    return order.items.every(item => 
      typeof item.price === "number" && typeof item.qty === "number" &&
      item.qty > 0 && item.price > 0 
    );

    //return order && order.items.length > 0 && 
        //  order.items.every(item => item.name !== "" && 
        //                    typeof item.price === 'number' && item.price > 0 && 
        //                    typeof item.qty === 'number' && item.qty > 0);

    }
  }
  
  class OrderPricing {
    calculateTotal(order) {
      return order.items.reduce((sum, {price, qty}) => {
        sum = sum + (price * qty);
        return sum;
      },0)
    }
  }
  
  class OrderService {
    constructor(validator, pricing) {
      this.validator = validator;
      this.pricing = pricing;
    }
    placeOrder(order) {
      if(this.validator.validate(order)) {
        return `TOTAL : ${this.pricing.calculateTotal(order)}`;
      } else {
        return "INVALID"
      }
  
    }
  }
  
  // Input: 
  const validator = new OrderValidator();
  const pricing = new OrderPricing();
  const service = new OrderService(validator, pricing);
  
  const order = {
    items: [
      { name: "apple", price: 2, qty: 3 },
      { name: "banana", price: 1, qty: 5 }
    ]
  };
  
  console.log(service.placeOrder(order));
  
  
  // output:
  //"TOTAL: 11"