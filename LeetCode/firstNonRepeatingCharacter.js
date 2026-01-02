// Leetcode - #387
// 🔹 Problem Statement
// Given a string s, return the index of the first character that does not repeat.
// If no such character exists, return -1.

// This tests: hash maps, Counting frequency, Single pass logic
function firstUniqueChar(s) {
  const freq = {};

  // Step 1: count frequency
  for (let ch of s) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  // Step 2: find first char with freq 1
  for (let i = 0; i < s.length; i++) {
    if (freq[s[i]] === 1) {
      return i;
    }
  }
  return -1;
};



let s = "loevltcode";
console.log(firstUniqueChar(s))
// Input:  "leetcode"
// Output: 0   // 'l' appears only once

// Input:  "loveleetcode"
// Output: 2   // 'v' appears only once