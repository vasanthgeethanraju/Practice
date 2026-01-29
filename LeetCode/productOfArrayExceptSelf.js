// Given an integer array nums, return an array output where output[i] is the product of all the elements of nums except nums[i].

// Each product is guaranteed to fit in a 32-bit integer.
function productOfArrayExceptSelf(nums) {
  let n = nums.length, res = [], leftProduct = 1, rightProduct = 1;

  for(let i=0; i<n; i++) {
    res[i] = leftProduct;
    leftProduct *= nums[i];
  }

  for(let i=n-1; i>=0; i--) {
    res[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return res;
};


const nums = [1,2,4,6];
console.log(productOfArrayExceptSelf(nums));

// Example 1:

// Input: nums = [1,2,4,6]

// Output: [48,24,12,8]