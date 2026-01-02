// Leetcode #49
function groupAnagrams(str) {
  let map = {};

  for (let s of str) {
    const key = s.split("").sort().join("");

    if(!map[key]) {
      map[key] = [];
    }
    map[key].push(s);
  }

  return map;
};

const str = ["eat","tea","tan","ate","nat","bat"];
console.log(groupAnagrams(str));