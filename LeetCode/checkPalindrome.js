// Problem: LeetCode #125 - Valid Palindrome
// Problem Description: Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
var isPalindrome = function(s) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanedString = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  // Check if the string is equal to its reverse
  let left = 0, right = cleanedString.length - 1;
  
  while (left < right) {
    if (cleanedString[left] !== cleanedString[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

// Input : "banana" , Output: false
let s = "banana";
console.log(isPalindrome(s));