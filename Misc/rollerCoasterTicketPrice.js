// Design a function to calculate roller coaster ticket prices based on customer age and height. The pricing rules are as follows: 
// Adults (18 years and older) pay a fixed price of 30 currency units, 
// Children (aged 3 and up, but under 18) pay 20 currency units, 
// Children shorter than 100 cm pay 15 currency units, 
// and Children under 3 get free admission. 
// Implement a function calculate_ticket_price(age, height) where age is an integer and height is an integer in centimeters. 
// Consider edge cases such as negative input and exceedingly large values. Provide at least three test cases.

function calculate_ticket_price(age, height) {
  // Validate presence
  if (age == null || height == null) return null;

  // Validate types
  if (!Number.isInteger(age) || !Number.isInteger(height)) return null;

  // Validate values
  if (age < 0 || height < 0) return null;

  // Pricing rules (ordered by priority)
  if (age < 3) return 0;

  if (age >= 18) {
    return 30;
  }

  // Only children (3–17) reach here
  if (height < 100) return 15;
  return 20;
}

console.log(calculate_ticket_price(2, 90));    // 0  (under 3)
console.log(calculate_ticket_price(10, 80));   // 15 (child, short)
console.log(calculate_ticket_price(10, 120));  // 20 (child)
console.log(calculate_ticket_price(18, 150));  // 30 (adult boundary)
console.log(calculate_ticket_price(-1, 100));  // null (invalid)
console.log(calculate_ticket_price(10, "80"));  // this is a string (null)