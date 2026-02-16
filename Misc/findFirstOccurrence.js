//In a given string p and s, find the indices of the first occurrence of the string s in p and append the start and end index in an array and return.

let s = "hello";
let p = "hello world";

// function findFirstOccurrence(p, s) {
//     const start = p.indexOf(s);

//     if (start === -1) {
//         return [-1, -1];
//     }

//     return [start, start + s.length - 1];
// }
function findFirstOccurrence(p, s) {
  if (s.length > p.length) return [-1, -1];

  for (let i = 0; i <= p.length - s.length; i++) {
      let match = true;

      for (let j = 0; j < s.length; j++) {
          if (p[i + j] !== s[j]) {
              match = false;
              break;
          }
      }

      if (match) {
          return [i, i + s.length - 1];
      }
  }

  return [-1, -1];
}


console.log(findFirstOccurrence(p,s));