// LeetCode #637 – Average of Levels in Binary Tree
/*
Problem: Average of Levels in Binary Tree (BFS)

Given the root of a binary tree, return an array where each element
is the average of the node values at that level.

Return averages in top-down order (level 0 to last level).

Constraints:
- Number of nodes: 0 to 10^4
- Values are integers (averages may be decimals)
- Tree may be empty
*/

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/*
TODO:
Implement a function that returns the average value of nodes
on each level of the binary tree using BFS.

Requirements:
- Use a queue
- Process one level at a time using the queue's current size
- For each level:
  - compute the sum of values
  - compute the average (sum / number of nodes in that level)
  - push that average into the result array
- Return the result array
- Do NOT use recursion
- Handle empty tree
*/
function averageOfLevels(root) {
  // TODO
  if(!root) return [];

  let queue = [], res = [];
  queue.push(root);

  while(queue.length > 0) {
    let levelSize = queue.length, currentSum = 0;

    for(let i =0; i<levelSize; i++) {
      let currentNode = queue.shift();

      currentSum += currentNode.val;

      if(currentNode.left) queue.push(currentNode.left);
      if(currentNode.right) queue.push(currentNode.right);
    }

    let currentAverage = currentSum / levelSize;
    res.push(currentAverage);
  }

  return res;
}

/* =======================
   Test Cases (Input/Output)
   ======================= */

// Example 1
// Tree:
//        3
//       / \
//      9  20
//         / \
//        15  7
const root1 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(averageOfLevels(root1));
// Expected Output: [3, 14.5, 11]


// Example 2
// Tree: empty
console.log(averageOfLevels(null));
// Expected Output: []


// Example 3
// Tree:
//        5
//       / \
//      1   9
//     /
//    0
const root2 = new TreeNode(
  5,
  new TreeNode(1, new TreeNode(0), null),
  new TreeNode(9)
);

console.log(averageOfLevels(root2));
// Expected Output: [5, 5, 0]


// Example 4
// Tree:
//        1
const root3 = new TreeNode(1);

console.log(averageOfLevels(root3));
// Expected Output: [1]
