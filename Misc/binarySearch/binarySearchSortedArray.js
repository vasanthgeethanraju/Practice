function searchRotated(nums, target) {
  // TODO 1: Initialize left and right pointers
  let left  = 0,
      right = nums.length - 1;
  // TODO 2: While left <= right:
  while (left <= right) {
  //   - Compute mid
    let mid = Math.floor((left + right ) / 2);
    //   - If nums[mid] == target, return mid
    if(nums[mid] === target) return mid;
    //   - Determine which side is sorted:
    //       A) Left side sorted if nums[left] <= nums[mid]
    //       B) Otherwise right side sorted
    //
    //   - If left side sorted:
    //       - Check if target is within nums[left]..nums[mid]
    //           - If yes, move right
    //           - If no, move left
    //
    //   - Else right side sorted:
    //       - Check if target is within nums[mid]..nums[right]
    //           - If yes, move left
    //           - If no, move right
    if (nums[left] <= nums[mid]) {  // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;  // Target is in the left sorted half, so move right
      } else {
        left = mid + 1;   // Target is not in the left half, so move left
      }
    } else {  // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;  // Target is in the right sorted half, so move left
      } else {
        right = mid - 1;  // Target is not in the right half, so move right
      }
    }
  }

  // TODO 3: Return -1 if not found
  return -1
}

const nums2 = [4, 5, 6, 7, 0, 1, 2];
console.log(searchRotated(nums2, 0)); // Expected: 4
console.log(searchRotated(nums2, 6)); // Expected: 2
console.log(searchRotated(nums2, 3)); // Expected: -1
