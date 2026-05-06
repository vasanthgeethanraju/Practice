function mergeSort(arr) {

  // TODO 1:
  // Base case:
  // if array size is 0 or 1, return it as already sorted.

  // TODO 2:
  // Find the middle index of the array.

  // TODO 3:
  // Split array into left half and right half.

  // TODO 4:
  // Recursively call mergeSort on left half.

  // TODO 5:
  // Recursively call mergeSort on right half.

  // TODO 6:
  // Merge the two sorted halves together
  // using a helper merge function.

  // TODO 7:
  // Return the merged sorted result.

  if(!arr || arr.length <=1) return arr;

  const mid = Math.floor(arr.length /  2);

  const left = arr.slice(0, mid), right = arr.slice(mid);

  const sortedLeft = mergeSort(left), sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);

  function merge(left, right) {
    const result = [];

    let i=0, j =0;

    while(i< left.length && j < right.length) {
      if(left[i] <= right[j]) {
        result.push(left[i]);
        i++
      } else{
        result.push(right[j]);
        j++;
      }
    }

    while(i < left.length) {
      result.push(left[i]);
      i++;
    }

    while(j < right.length) {
      result.push(right[j]);
      j++;
    }

    return result;
  }
}


const arr1 = [64, 25, 12, 22, 11];
const arr2 = [5, 4, 3, 2, 1];
const arr3 = [1, 2, 3, 4, 5];
const arr4 = [3, -1, 3, 0, -5];
const arr5 = [9];

console.log(mergeSort(arr1)); // expected: [11, 12, 22, 25, 64]
console.log(mergeSort(arr2)); // expected: [1, 2, 3, 4, 5]
console.log(mergeSort(arr3)); // expected: [1, 2, 3, 4, 5]
console.log(mergeSort(arr4)); // expected: [-5, -1, 0, 3, 3]
console.log(mergeSort(arr5)); // expected: [9]