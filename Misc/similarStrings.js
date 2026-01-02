// Code 1: Given a list of words, find the number of pairs of strings that are similar. Two words are similar if they both contain the same set of characters. 
// Input: An array of strings representing the list of words. Output: An integer, representing the total number of similar string pairs. 
// Example: Input: ['abc', 'bca', 'xyz', 'zyx', 'acb'] Output: 3
function similarStrings(str) {
  let map = {};

  for (let s of str) {
    const key = s.split("").sort().join("");

    if(!map[key]) {
      map[key] = [];
    }
    map[key].push(s);
  }

  return Math.max(...Object.values(map).map(arr => arr.length));
  // let obj = {};
  // return str.reduce((acc, item) => {
  //   const sorted = item.split('').sort().join('');
  //   obj[sorted] = (obj[sorted] || 0) + 1;
  //   return acc = Math.max(obj[sorted]);
  // }, 0);
};

const str = ['abc', 'bca', 'xyz', 'zyx', 'acb'];
console.log(similarStrings(str));
