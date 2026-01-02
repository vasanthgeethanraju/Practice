// Code 3: // 2. input a string, remove duplicated letter but keep the last character, return a string in original ordering

// example:
// input: abcccdddfgf
// output: abcdgf
function removeDuplicatesButKeepLast(str) {
  let result = "";
  let seen = new Set();
  
  // Traverse the string in reverse order
  for (let i = str.length - 1; i >= 0; i--) {
    if (!seen.has(str[i])) {
      result = str[i] + result;  // Add to the front of result
      seen.add(str[i]);
    }
  }
  
  return result;
}

let str = "abcccdddfgf";
console.log(removeDuplicatesButKeepLast(str));  // Output: "abcdgf"
