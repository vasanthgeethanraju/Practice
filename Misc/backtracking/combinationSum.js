// Leetcode #39 Combination Sum
/**
 * Return all unique combinations where numbers sum to target
 * Each number may be reused unlimited times
 */
function combinationSum(candidates, target) {
  let result = [];

  /**
   * backtrack helper
   * @param {number} start - index to control combinations (avoid duplicates)
   * @param {number} sum - current sum of path
   * @param {number[]} path - current combination being built
   */
  function backtrack(start, sum, path) {
    // TODO 1:
    // If sum equals target:
    //   - we found a valid combination
    //   - add a COPY of path to result
    //   - return
    if(sum === target) {
      result.push([...path]);
      return;
    }

    // TODO 2:
    // If sum exceeds target:
    //   - this path can never be valid
    //   - PRUNE (return)
    if(sum > target) return;
    // TODO 3:
    // Loop through candidates starting from `start`
    // (this ensures combinations, not permutations)
    for (let i = start; i < candidates.length; i++) {

      // TODO 4:
      // Choose the current candidate
      // Add candidates[i] to path
      path.push(candidates[i]);

      // TODO 5:
      // Recurse:
      // - i (not i + 1) because reuse is allowed
      // - sum + candidates[i]
      backtrack(i, sum + candidates[i], path);
      // TODO 6:
      // Undo the choice (backtrack)
      // Remove last element from path
      path.pop()
    }
  }

  // TODO 7:
  // Start backtracking from index 0, sum 0, empty path
  backtrack(0, 0, []);

  return result;
}
// ====================
// Test Cases
// ====================

// Test case 1
const candidates1 = [2, 3, 6, 7];
const target1 = 7;
console.log(combinationSum(candidates1, target1));
// Expected output:
// [
//   [2, 2, 3],
//   [7]
// ]


// Test case 2
const candidates2 = [2, 3, 5];
const target2 = 8;
console.log(combinationSum(candidates2, target2));
// Expected output:
// [
//   [2, 2, 2, 2],
//   [2, 3, 3],
//   [3, 5]
// ]


// Test case 3
const candidates3 = [2];
const target3 = 1;
console.log(combinationSum(candidates3, target3));
// Expected output:
// []


// Test case 4
const candidates4 = [1];
const target4 = 2;
console.log(combinationSum(candidates4, target4));
// Expected output:
// [
//   [1, 1]
// ]
