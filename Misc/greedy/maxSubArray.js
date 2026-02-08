// Leetcode #53: Maximum Subarray

/**
 * Return the maximum sum of a contiguous subarray
 */
function maxSubArray(nums) {
  // TODO 1: Initialize maxSum and currentSum. Both start with the first element
  let maxSum = nums[0];
  let currentSum = nums[0];
  // TODO 2: Loop through the array starting from index 1
  for (let i = 1; i < nums.length; i++) {
    // TODO 3: Decide: start a new subarray at nums[i] OR extend the previous subarray
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    // TODO 4: Update maxSum if currentSum is larger
    maxSum = Math.max(maxSum, currentSum);
  }
  // TODO 5: Return the maximum subarray sum found
  return maxSum;
}

// Test case 1
const nums1 = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(nums1)); // Expected output: 6

// Test case 2
const nums2 = [1];
console.log(maxSubArray(nums2)); // Expected output: 1

// Test case 3
const nums3 = [5,4,-1,7,8];
console.log(maxSubArray(nums3)); // Expected output: 23

// Test case 4
const nums4 = [-1,-2,-3,-4];
console.log(maxSubArray(nums4)); // Expected output: -1

// Test case 5
const nums5 = [0, 0, 0];
console.log(maxSubArray(nums5)); // Expected output: 0

