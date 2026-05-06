function heapSort(arr) {

  // TODO 1:
  // Build a max heap from the array.

  // TODO 2:
  // For end = last index down to 1:
  //   - swap arr[0] (max) with arr[end]
  //   - reduce heap size to end
  //   - heapify at root (index 0) to restore max-heap property

  // TODO 3:
  // Return arr
  if(!Array.isArray(arr) || arr.length <= 1) return arr;

  const n = arr.length;
  buildMaxHeap(arr);

  let heapSize = n;

  for(let end = heapSize - 1; end > 0; end--) {
    const temp = arr[0];
    arr[0] = arr[end];
    arr[end] = temp;
    heapSize--;
    heapify(arr, heapSize, 0);
  }

  return arr;
}

function buildMaxHeap(arr) {

  // TODO A:
  // Start from last parent index:
  //   Math.floor(n/2) - 1
  // and heapify each node down to index 0.
  const n = arr.length;

  if(n <= 1) return arr;

  const lastParent = Math.floor(n / 2) - 1;

  for(let i = lastParent; i >= 0; i--) {
    heapify(arr, n, i);
  }
}

function heapify(arr, heapSize, i) {

  // TODO X:
  // Compute left and right child indexes.

  // TODO Y:
  // Find which index holds the largest value among:
  // - i
  // - left child (if in range)
  // - right child (if in range)

  // TODO Z:
  // If largest is not i:
  //   - swap arr[i] with arr[largest]
  //   - recursively heapify at largest

  let largest = i;

  const left = 2 * i + 1, right = 2 * i + 2;
  
  if(left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  if(right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if(largest !== i) {
    const temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, heapSize, largest);
  }
}

// Test Cases
const arr1 = [64, 25, 12, 22, 11];
const arr2 = [5, 4, 3, 2, 1];
const arr3 = [1, 2, 3, 4, 5];
const arr4 = [3, -1, 3, 0, -5];
const arr5 = [9];

console.log(heapSort(arr1)); // expected: [11, 12, 22, 25, 64]
console.log(heapSort(arr2)); // expected: [1, 2, 3, 4, 5]
console.log(heapSort(arr3)); // expected: [1, 2, 3, 4, 5]
console.log(heapSort(arr4)); // expected: [-5, -1, 0, 3, 3]
console.log(heapSort(arr5)); // expected: [9]