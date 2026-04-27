// A megastore offers three types of discounts, which are represented as DiscountType object.
// Implement the getDiscountedPrice function which should take the total weight of the shopping cart, the total price, and the discount type. It should return the final discounted price based on the discount schemes as shown in the promotional video

// For example, the following code:
// console. log|getDiscountedPrice(12, 100, DiscountType.Weight));
// should print:
// 82

const DiscountType = {
  Standard: "Standard",
  Seasonal: "Seasonal",
  Weight: "Weight"
};

function getDiscountedPrice(cartWeight, totalPrice, discountType) {

  // weight = any && standard discount 6% 
  // weight = any && seasonal discount 12%
  // weight  <= 10  discount 6% 
  // weight  > 10  discount 18% 

  if (discountType === "Seasonal") {
    return totalPrice - (totalPrice * 12/100) ;
  } else if(cartWeight <=10 || discountType === "Standard") {
    return totalPrice - (totalPrice * 6/100) ;
  } else if (cartWeight > 10 ) {
    return totalPrice - (totalPrice * 18/100) ;
  }
  return 0.0;
}

console.log(getDiscountedPrice(12, 100, DiscountType.Weight));


