// LeetCode #15 - 3Sum
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] where nums[i] + nums[j] + nums[k] == 0, 
// and the indices i, j and k are all distinct.
// The output should not contain any duplicate triplets. You may return the output and the triplets in any order.
// LeetCode 15 - 3Sum
function threeSum(nums) {
  // TODO 1: Sort nums ascending
  nums.sort((a,b) => a - b);

  const res = [];

  // TODO 2: Loop i from 0 to nums.length - 3
  for (let i = 0; i < nums.length - 2; i++) {
    // TODO 3: If i > 0 and nums[i] === nums[i-1], continue (skip duplicate starting value)
    if( i > 0 && nums[i] === nums [i-1]) continue;

    // TODO 4 (optional optimization): If nums[i] > 0, break
    if(nums[i] > 0) break;
    // TODO 5: Set l = i + 1, k = nums.length - 1
    let j = i + 1;
    let k = nums.length - 1;

    // TODO 6: While j < k:
    while (j < k) {
      // TODO 7: Compute sum = nums[i] + nums[j] + nums[k]
      const sum = nums[i] + nums[j] + nums[k];

      if (sum === 0) {
        // TODO 8: Push [nums[i], nums[j], nums[k]] into res
        res.push([nums[i], nums[j], nums[k]]);
        // TODO 9: Move j++ and k--
        j++, k--;
        // TODO 10: Skip duplicates on j (while j < k and nums[j] === nums[j - 1]) j++
        while (j < k && nums[j] === nums[j - 1]) j++;
        // TODO 11: Skip duplicates on k (while j < k and nums[k] === nums[k + 1]) k--
        while (j < k && nums[k] === nums[k + 1]) k--;
      } else if (sum < 0) {
        // TODO 12: Need bigger sum, so j++
        j++;
      } else {
        // TODO 13: Need smaller sum, so k--
        k--;
      }
    }
  }

  return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])); // Output: [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]
console.log(threeSum([0, 1, 1])); // Output: []
console.log(threeSum([0, 0, 0])); // Output: [ [ 0, 0, 0 ] ]
console.log(threeSum([3, 0, -2, -1, 1, 2])); // Output: [ [ -2, -1, 3 ], [ -2, 0, 2 ], [ -1, 0, 1 ] ]
console.log(threeSum([-2, 0, 0, 2, 2])); // Output: [ [ -2, 0, 2 ] ]