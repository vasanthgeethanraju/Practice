function selectionSort(arr) {

  // TODO: Move left to right through the array, treating each index as the next position to fill,
  // assume that position is the minimum, scan the remaining unsorted portion to find the true
  // minimum value, update the minimum index whenever a smaller element is found, and after the
  // scan swap that minimum element into the current position; repeat to grow the sorted left side
  // until all elements are placed, then return the sorted array.
    if(!Array.isArray(arr) || arr.length <= 1) return arr;

  const n = arr.length;

  for(let i =0; i<n; i++) {
    let minIndex = i;

    for(let j = i + 1; j <n; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if(minIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }

  return arr;
}

const arr1 = [64, 25, 12, 22, 11];
const arr2 = [5, 4, 3, 2, 1];
const arr3 = [1, 2, 3, 4, 5];
const arr4 = [3, -1, 3, 0, -5];
const arr5 = [9];

console.log(selectionSort(arr1)); // expected: [11, 12, 22, 25, 64]
console.log(selectionSort(arr2)); // expected: [1, 2, 3, 4, 5]
console.log(selectionSort(arr3)); // expected: [1, 2, 3, 4, 5]
console.log(selectionSort(arr4)); // expected: [-5, -1, 0, 3, 3]
console.log(selectionSort(arr5)); // expected: [9]
