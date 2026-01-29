// Leetcode #3- Longest Substring Without Repeating Characters
// Given a string s, find the length of the longest substring without duplicate characters.
// A substring is a contiguous sequence of characters within a string.
// Example 1: Input: s = "zxyzxyz" Output: 3
// Explanation: The string "xyz" is the longest without duplicate characters.
function lengthOfLongestSubstring(s) {
  // TODO 1: Create a map to store each character's most recent index
  // Purpose: helps detect duplicates and know where the window must move
  let map = new Map();
  // TODO 2: Initialize left pointer to the start of the window
  let left = 0;
  // TODO 3: Initialize a variable to store the maximum length found
  let maxLength = 0;
  // TODO 4: Loop through the string using a right pointer (from 0 to s.length - 1)
  for(let right =0; right< s.length; right++) {

    // TODO 5: Read the current character using the right pointer
    let curr = s[right];
    // TODO 6: Check if this character already exists in the map AND if its last seen position is inside the current window
    if(map.has(curr) && map.get(curr) >= left) {
      // TODO 7: Move the left pointer to one position after the last occurrence of this character
      left = map.get(curr) + 1;
    }
    // TODO 8: Update the map with the current character’s new index
    map.set(curr, right);
    // TODO 9: Calculate the current window length. Formula logic: window size = right - left + 1
    maxLength = Math.max(maxLength, right - left + 1);
    // TODO 10: Update max length if current window is larger
  }
  // TODO 11: Return the maximum length
  return maxLength;
}

const s1 = "zxyzxyz"
console.log(lengthOfLongestSubstring(s1)); // Output: 3

const s2 = "xxxx"
console.log(lengthOfLongestSubstring(s2)); // Output: 1