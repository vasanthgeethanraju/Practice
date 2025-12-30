// Given an integer array, find four different integers x, y, m, n such that the relationship y = mx + n holds. 
// Use each number exactly once. For example, given the input [-2, 0, 2, 3, 4], find x, y, m, n that satisfy this condition.
function findLinearRelation(nums) {
  const n = nums.length;
  
  if (n < 4) {
    return null; // Need at least 4 numbers
  }
  
  // Try all combinations of x, y, m (O(n^3))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      
      const x = nums[i];
      const y = nums[j];
      
      for (let k = 0; k < n; k++) {
        if (k === i || k === j) continue;
        
        const m = nums[k];
        
        // Calculate required n: y = mx + n => n = y - mx
        const requiredN = y - m * x;
        
        // Check if requiredN exists in remaining numbers (O(n))
        for (let l = 0; l < n; l++) {
          if (l === i || l === j || l === k) continue;
          
          if (nums[l] === requiredN) {
            return { x, y, m, n: requiredN };
          }
        }
      }
    }
  }
  
  return null; // No solution found
}

// Input
console.log("Test 1")
const result1 = findLinearRelation([-2, 0, 2, 3, 4]);
console.log(result1);
// Example: 0 = 2 * (-2) + 4 ✓

console.log('\nTest 2');
const result2 = findLinearRelation([1, 2, 3, 4, 5]);
console.log(result2);
// Example: 5 = 2 * 1 + 3 ✓