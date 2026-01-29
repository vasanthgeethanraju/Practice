// Binary Search:
// When to think binary search: array is sorted or the answer space is monotonic (“true then true then false…”)
// Ascending sort
function binarySearchFindTarget(arr, target) {
  let left  = 0,
      right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target ) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 7;
console.log(binarySearchFindTarget(arr, target));

// Descending sort
// function binarySearchFindTarget(arr, target) {
// sort the array in descending order first or ensure its a descending array
//   let left  = 0,
//       right = arr.length - 1;

//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);

//     if (arr[mid] === target) return mid;
//     if (arr[mid] > target ) {
//       left = mid - 1;
//     } else {
//       right = mid + 1;
//     }
//   }
//   return -1;
// }