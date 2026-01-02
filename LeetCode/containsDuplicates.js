// Leetcode #217 Problem Statement
// Given an integer array nums, return true if any value appears at least twice, otherwise return false.
// This tests: Hash sets, Early exit optimization, Single pass logic
function containsDuplicate(nums) {
  const seen = new Set();

  for (let num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}

let nums = [1, 2, 3, 4];
console.log(containsDuplicate(nums));
// Input:  [1, 2, 3, 1]
// Output: true

// Input:  [1, 2, 3, 4]
// Output: false