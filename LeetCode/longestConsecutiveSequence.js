// LeetCode #128 - Longest Consecutive Sequence.
// Given an array of integers nums, return the length of the longest consecutive sequence of elements that can be formed.
// A consecutive sequence is a sequence of elements in which each element is exactly 1 greater than the previous element. 
// The elements do not have to be consecutive in the original array.
// You must write an algorithm that runs in O(n) time.
class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  longestConsecutive(nums) {
    // if(nums.length === 0) return { best: 0, sequence: [] };
    if(nums.length === 0) return 0;;

    let set  = new Set(nums),
        best = 0,
        bestStart = null; // needed if we want to actual sequence (not part of leetcode ask)

    for(let x of set) {
      if(set.has(x-1)) continue;

      let cur =x, len =1;
      while(set.has(cur+1)){
          cur++, len++;
      }
      // best = Math.max(best, len);
      // keep your original line
      // const prevBest = best;
      best = Math.max(best, len);

      // if best changed, that means this sequence is the new best
      // if (best !== prevBest) {
      //   bestStart = x;
      // }
    }

    
    // build the actual best sequence
    // const sequence = [];
    // if (bestStart !== null) {
    //   for (let i = 0; i < best; i++) {
    //     sequence.push(bestStart + i);
    //   }
    // }

    // return { best, sequence };
    return best;
  }
}

// Sample Inputs + Expected Outputs

const sol = new Solution();

console.log(sol.longestConsecutive([2, 20, 4, 10, 3, 4, 5])); 
// Output: 4  (sequence: 2,3,4,5)

console.log(sol.longestConsecutive([0, 3, 2, 5, 4, 6, 1, 1])); 
// Output: 7  (sequence: 0,1,2,3,4,5,6)

console.log(sol.longestConsecutive([])); 
// Output: 0

console.log(sol.longestConsecutive([100])); 
// Output: 1

console.log(sol.longestConsecutive([100, 4, 200, 1, 3, 2])); 
// Output: 4  (sequence: 1,2,3,4)
