// Leetcode 347

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        let res = [],
            freq = {};

        // Count frequency of each number
        for (let num of nums) {
            freq[num] = (freq[num] || 0) + 1;
        }

        // Sort numbers based on frequency
        let sortedNums = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);

        // Take the first k elements
        for (let i = 0; i < k; i++) {
            res.push(Number(sortedNums[i])); // Convert string back to number
        }

        return res;
    }
}
// Example 1: Calling the function
let solution = new Solution();
let nums = [1, 1, 2, 2, 2, 3, 3];
let k = 2;

// Call the method
let result = solution.topKFrequent(nums, k);

// Output the result
console.log(result); // Output: [1, 2]