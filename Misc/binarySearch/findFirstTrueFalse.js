function findFirstTrue(arr) {
  let left = 0, right = arr.length - 1;

  while(left < right) {
    let mid = Math.floor((left + right) / 2);

    if(arr[mid]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return arr[left] ? left : -1;
}

// Sample tests
let arr = [false, false, false, false, false, false, true, true, true, true];
console.log(findFirstTrue(arr));