function quickSort(arr, left = 0, right = arr.length - 1) {

  // TODO 1:
  // Base case:
  // If left >= right, return.

  // TODO 2:
  // Call partition(arr, left, right)
  // It returns pivot index p.

  // TODO 3:
  // Recursively quickSort left part (left, p - 1)

  // TODO 4:
  // Recursively quickSort right part (p + 1, right)

  // TODO 5:
  // Return arr

  if(left >= right) {
    return arr;
  }

  const p = partition(arr, left, right);

  quickSort(arr, left, p - 1);
  quickSort(arr, p + 1, right);

  return arr;
}

function partition(arr, left, right) {

  // TODO A:
  // Generate a random index between left and right.

  // TODO B:
  // Swap the random element with arr[right]
  // so pivot is moved to the end.

  // TODO C:
  // Store pivot value (arr[right])

  // TODO D:
  // Create pointer i = left
  // It tracks position for next smaller-than-pivot element.

  // TODO E:
  // Loop j from left to right - 1:
  // If arr[j] < pivot:
  //   swap arr[i] and arr[j]
  //   increment i

  // TODO F:
  // After loop:
  // swap arr[i] and arr[right]
  // (puts pivot in correct position)

  // TODO G:
  // Return i (final pivot index)
  const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));

  [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

  const pivot = arr[right];

  let i = left - 1;

  for(let j = left; j < right; j++) {
    if(arr[j] <= pivot) {
      i++;

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];

  return i + 1;
}


const arr1 = [64, 25, 12, 22, 11];
const arr2 = [5, 4, 3, 2, 1];
const arr3 = [1, 2, 3, 4, 5];
const arr4 = [3, -1, 3, 0, -5];
const arr5 = [9];

console.log(quickSort(arr1)); // expected: [11, 12, 22, 25, 64]
console.log(quickSort(arr2)); // expected: [1, 2, 3, 4, 5]
console.log(quickSort(arr3)); // expected: [1, 2, 3, 4, 5]
console.log(quickSort(arr4)); // expected: [-5, -1, 0, 3, 3]
console.log(quickSort(arr5)); // expected: [9]