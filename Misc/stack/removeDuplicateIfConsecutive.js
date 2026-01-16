// Code 2: // 1. input a string, remove duplicated letter if consecutive, return a string in original ordering

// example:
// input: abcccdddfgf
// output: abcdfgf
function removeDuplicateIfConsective(str) {
  // let res= "";
  let res= [];
  for(let i=0;i<str.length; i++) {
    if(str[i] !== str[i+1]) {
      // res += str[i];
      res.push(str[i]);
    } 
  }
  return res.join("");
};

let str = "abccdbddbb";
console.log(removeDuplicateIfConsective(str));