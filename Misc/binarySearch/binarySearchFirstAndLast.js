// Find First and Last Position of Element
// Concept

// Array is sorted, duplicates exist.

// You need:

// first index of target

// last index of target

// Key idea:
// Run binary search twice:

// biased to find the leftmost occurrence

// biased to find the rightmost occurrence
function searchRange(nums, target) {
  // TODO 1: Write a helper function findBound(isLeft)
  //   - It should binary search for target
  //   - If isLeft is true, find the leftmost index
  //   - If isLeft is false, find the rightmost index
  //   - Return the bound index, or -1 if not found

  // TODO 2: Compute leftBound = findBound(true)
  // TODO 3: If leftBound is -1, return [-1, -1]
  // TODO 4: Compute rightBound = findBound(false)
  // TODO 5: Return [leftBound, rightBound]
  function findBound(isLeft) {
    let left = 0;
    let right = nums.length - 1;
    let bound = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        bound = mid;
        // If searching for the leftmost bound, move the right pointer to the left
        // to continue searching in the left half
        if (isLeft) {
          right = mid - 1;
        } else {
          // If searching for the rightmost bound, move the left pointer to the right
          // to continue searching in the right half
          left = mid + 1;
        }
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return bound;
  }

  // Find the leftmost bound
  const leftBound = findBound(true);
  // If the leftmost bound is -1, the target is not present, so return [-1, -1]
  if (leftBound === -1) {
    return [-1, -1];
  }

  // Find the rightmost bound
  const rightBound = findBound(false);

  // Return the result as an array with the leftmost and rightmost indices
  return [leftBound, rightBound];
}

const nums3 = [5, 7, 7, 8, 8, 10];
console.log(searchRange(nums3, 8)); // Expected: [3, 4]
console.log(searchRange(nums3, 6)); // Expected: [-1, -1]
