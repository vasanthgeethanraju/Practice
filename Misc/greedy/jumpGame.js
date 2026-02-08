// Leetcode #55: Jump Game

/**
 * Determine if you can reach the last index
 * nums[i] represents maximum jump length from index i
 */
function canJump(nums) {
  // TODO 1:
  // Initialize maxReach
  // This tracks the farthest index we can reach so far
  let maxReach = 0;

  // TODO 2:
  // Loop through the array
  for (let i = 0; i < nums.length; i++) {

    // TODO 3:
    // If current index i is greater than maxReach:
    //   - it means we cannot reach this position
    //   - return false immediately
    if (i > maxReach) return false;

    // TODO 4:
    // Update maxReach
    // Compare current maxReach vs i + nums[i]
    maxReach = Math.max(maxReach, i + nums[i]);

    // TODO 5:
    // If maxReach reaches or passes the last index:
    //   - we can finish the game
    //   - return true early
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }

  // TODO 6:
  // If loop finishes, return true
  // (means we never got stuck)
  return true;
}

// Test case 1
const nums1 = [2, 3, 1, 1, 4];
console.log(canJump(nums1)); // Expected output: true

// Test case 2
const nums2 = [3, 2, 1, 0, 4];
console.log(canJump(nums2)); // Expected output: false. Explanation: index 3 has 0 jump, stuck before last index

// Test case 3
const nums3 = [0];
console.log(canJump(nums3)); // Expected output: true. Already at last index

// Test case 4
const nums4 = [2, 0, 0];
console.log(canJump(nums4)); // Expected output: true

// Test case 5
const nums5 = [1, 1, 0, 1];
console.log(canJump(nums5)); // Expected output: false

