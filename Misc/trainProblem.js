// # Train Scheduling Problem
// A train scheduling yard receives trains that need to be rearranged and expedited onto the main tracks. Each train is denoted as tN where N is a number.
// You are given an array representing the current ordering of trains. The array can contain strings or other arrays. Nest arrays are prefixed with the following operators:
// Expedite (E) - The single element contained within the array should be moved to the front of the sequence
// Swap (S) - Swaps the positions of the two elements within the array
// For example:
// ['t1','t2','t3'] => Trains are in sequence t1, t2, t3
// ['t1',['E','t2'],'t3'] => Expedite t2, resulting in sequence t2, t1, t3
// ['t1',['S','t2','t3']] => Swap t2 and t3, resulting in sequence t1, t3, t2
// Write a function that takes the train ordering array as input and returns an array with the rearranged sequence based on the operators.
// Some examples:
// Input: ['t1','t2','t3'] => Output: t1,t2,t3
// Input: ['t1',['E','t2'],'t3'] => Output: t2,t1,t3
// Input: ['t1',['E','t2'],['S','t3','t4']] => Output: t2,t1,t4,t3
// The operators can also be nested. When nested, E will expedite its contents to the front of its immediate context only, rather than the overall output array.
// For example:
// `Input: ['t1',['E',['S','t2',['E','t3']]]]`
// The inner E moves t3 to the front of S(t2, t3), resulting in S(t3, t2)
// Then the outer E moves the result of S(t3, t2) to the front of the whole sequence, resulting in t2, t3 being prepended to t1
// `Output: t2,t3,t1`
// `Input: [['S','t1',['S','t3','t4']],'t2']`
// t4 swaps with t3 resulting in S(t1, (t4, t3))
// t1 swaps with the new array resulting in t4, t3, t1
// t2 is added on at the end.
// `Output: t4,t3,t1,t2`

function process(arr2) {
  // console.log(arr1, arr2);
  for (let i=0; i < arr2.length; i++){
    if(Array.isArray(arr2[i])) {
      let innerArray = arr2[i],
          firstElem = innerArray[0],
          secondElem = innerArray[1];

      if(firstElem === "E") {
        // arr2 = arr2.filter(ar => ar !== secondElem);
        arr2.splice(i, 1);
        arr2.unshift(secondElem);
        i--;
      }
    }
  }

  return arr2;
}

let arr1= ["t1", "t2", "t3"],
arr2 = ["t1", ["E", "t2"], "t3"]

console.log(process(arr2));

