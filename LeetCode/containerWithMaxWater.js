// LeetCode #11
// You are given an integer array heights where heights[i] represents the height of the ith bar.
// You may choose any two bars to form a container. Return the maximum amount of water a container can store.
// Example 1=> Input: height = [1,7,2,5,4,7,3,6], Output: 36
// Example 2=> Input: height = [2,2,2] Output: 4

function maxArea(height) {
  // Step 1: Initialize two pointers
  // - Create a variable 'i' to point to the leftmost bar (index 0)
  // - Create a variable 'j' to point to the rightmost bar (index height.length - 1)
  let i= 0, j= height.length -1;
  // Step 2: Initialize a variable to track the maximum area
  // - Create a variable 'maxArea' and set it to 0 initially
  let maxArea = 0;
  // Step 3: Loop while the two pointers do not meet
  // - Create a while loop that continues as long as 'i' < 'j'
  while(i<j) {
    // Step 4: Calculate the area formed by the bars at indices 'i' and 'j'
    // - Get the height of the shorter bar between 'height[i]' and 'height[j]'
    // - Calculate the width as the difference between 'j' and 'i'
    // - Multiply the height and width to get the area
    let barHeight = Math.min(height[i], height[j]),
        barWidth  = j - i,
        currArea  = barHeight * barWidth; 
    // Step 5: Update the maximum area if the current area is larger
    // - If the calculated area is greater than 'maxArea', update 'maxArea'
    if(currArea > maxArea) maxArea = currArea;
    // Step 6: Move the pointer corresponding to the shorter bar inward
    // - If 'height[i]' < 'height[j]', increment 'i' (move left pointer to the right)
    // - Else, decrement 'j' (move right pointer to the left)
    if(height[i] < height[j]) {
      i++;
    } else {
      j--;
    }
  }
  
  // Step 7: Return the maximum area found
  // - Return 'maxArea'
  return maxArea;
}

let height1 = [1, 7, 2, 5, 4, 7, 3, 6];
console.log(maxArea(height1));  // Output: 36

let height2 = [2, 2, 2];
console.log(maxArea(height2));  // Output: 4

let height3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(maxArea(height3));  // Output: 20
