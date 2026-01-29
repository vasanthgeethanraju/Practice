function lastOccurrence(nums, target) {
  let left = 0, right = nums.length - 1, ans = -1;

  while(left <= right) {
    const mid = Math.floor((left + right) / 2);

    if(nums[mid] === target){
      ans=mid;
      left = mid + 1;
    } else if(nums[mid] < target){
      left = mid + 1;
    } else{
      right = mid - 1;
    }
  }
  return ans;
}

console.log(lastOccurrence([1, 2, 2, 2, 3], 2)); // 1 (nums[1]=2)
console.log(lastOccurrence([1,3,5,7], 7)); // 3
console.log(lastOccurrence([1,3,5,7], 0)); // -1