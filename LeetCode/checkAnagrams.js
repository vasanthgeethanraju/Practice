// 🔹 LeetCode #242

// Valid Anagram 
// Problem Statement: Given two strings s and t, return true if t is an anagram of s.
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freq = {};

  for (let ch of s) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  for (let ch of t) {
    if (!freq[ch]) return false;
    freq[ch]--;
  }

  return true;
}

let s = "anagram", t ="naagram";
console.log(isAnagram(s,t));
// Input:  s = "anagram", t = "nagaram"
// Output: true

// Input:  s = "rat", t = "car"
// Output: false