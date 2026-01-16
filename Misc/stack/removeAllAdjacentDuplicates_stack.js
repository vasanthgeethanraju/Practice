// Remove All Adjacent Duplicates in String - (LeetCode #1047). 
// Given a string, repeatedly remove adjacent duplicate characters until no more duplicates exist.
// Example- Input: "abbaca", Output: "ca"

// function removeAllAdjacentDuplicates(str) {
//   let stack = [];

//   for (let ch of str) {
//     if(stack.length && stack[stack.length - 1] === ch) {
//       stack.pop();
//     } else {
//       stack.push(ch);
//     }
//   }

//   return stack.join("");
// }

// let str = "abbaca";
// console.log(removeAllAdjacentDuplicates(str));

// //(Warm-up for monotonic stack)
function mapped(str) {
  let stack = [];

  for (let ch of str) {
    while(stack.length && stack[stack.length - 1] < ch) {
      stack.pop();
    }
    stack.push(ch);
  }

  return stack;
}

let str = [3, 1, 2]
console.log(mapped(str));