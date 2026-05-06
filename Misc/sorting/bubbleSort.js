function bubbleSort(arr) {

  // TODO: Run multiple passes through the array and compare each adjacent pair; if the left value
  // is greater than the right value, swap them so larger values keep moving toward the end.
  // After each pass, the largest unsorted element is in its correct final position, so later passes
  // can skip the already sorted tail; track whether any swap happened and stop early if a full
  // pass makes no swaps, then return the sorted array.
  const n = arr.length;

  for(let i=0; i<n; i++) {
    let swapped = false;

    for(let j = 0; j < n - 1 - i; j++) {
      if(arr[j] > arr [j + 1]) {
        const temp = arr[j];
        arr [j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if(!swapped) break;
  }

  return arr;
}

const arr1 = [5, 1, 4, 2, 8];
const arr2 = [3, 2, 1];
const arr3 = [1, 2, 3, 4, 5];
const arr4 = [7, -2, 7, 0, -5];
const arr5 = [9];

console.log(bubbleSort(arr1)); // expected: [1, 2, 4, 5, 8]
console.log(bubbleSort(arr2)); // expected: [1, 2, 3]
console.log(bubbleSort(arr3)); // expected: [1, 2, 3, 4, 5]
console.log(bubbleSort(arr4)); // expected: [-5, -2, 0, 7, 7]
console.log(bubbleSort(arr5)); // expected: [9]
