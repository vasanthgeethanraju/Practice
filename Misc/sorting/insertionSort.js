function insertionSort(arr) {

  // TODO: Starting at index 1 (since index 0 is already sorted), treat each element as a key, 
  // scan backward through the sorted left portion, shift any larger elements one step right, 
  // stop when you reach the start or a smaller/equal value, insert the key into that open position, 
  // repeat for all elements, and return the sorted array.
  for(let i =1; i < arr.length; i++) {
    const key = arr[i];
    let j = i -1;

    while(j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}

const arr1 = [5, 2, 4, 6, 1, 3];
const arr2 = [12, 11, 13, 5, 6];
const arr3 = [1, 2, 3, 4, 5];
const arr4 = [9, 7, 5, 3, 1];
const arr5 = [4, -1, 4, 0, -3];
console.log(insertionSort(arr1)); // expected: [1, 2, 3, 4, 5, 6]
console.log(insertionSort(arr2)); // expected: [5, 6, 11, 12, 13]
console.log(insertionSort(arr3)); // expected: [1, 2, 3, 4, 5]
console.log(insertionSort(arr4)); // expected: [1, 3, 5, 7, 9]
console.log(insertionSort(arr5)); // expected: [-3, -1, 0, 4, 4]
