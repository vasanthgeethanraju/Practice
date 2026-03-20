function kthUniqueMaximum(arr1, arr2, k) {
  let i = arr1.length - 1, 
      j = arr2.length - 1;
  let count = 0;

  while(i >= 0 || j >= 0) {
    let val;

    if (i >= 0 && j >= 0) {
      if(arr1[i] > arr2[j]) {
        val = arr1[i];
      } else if(arr2[j] > arr1[i]) {
        val = arr2[j];
      } else {
        val = arr1[i];
      }
    } else if(i>=0){
      val = arr1[i];
    } else {
      val = arr2[j];
    }
    
    count ++;
    if (count === k) {
      return val; 
    }

    while(i>=0 && arr1[i] === val) {
      i--;
    }
    while(j>=0 && arr2[j] === val) {
      j--;
    }
  }
  return null;
}

console.log(kthUniqueMaximum([1, 2, 4, 4, 5], [2, 4, 6], 1)); // 6
console.log(kthUniqueMaximum([1, 2, 4, 4, 5], [2, 4, 6], 2)); // 5
console.log(kthUniqueMaximum([1, 2, 4, 4, 5], [2, 4, 6], 3)); // 4
console.log(kthUniqueMaximum([1, 2, 4, 4, 5], [2, 4, 6], 4)); // 2
console.log(kthUniqueMaximum([1, 2, 4, 4, 5], [2, 4, 6], 5)); // 1
console.log(kthUniqueMaximum([1, 2, 4, 4, 5], [2, 4, 6], 6)); // null
