// Leetcode #124 Binary Tree Maximum Path Sum
/*
Problem: Binary Tree Maximum Path Sum (DFS)

A path is any sequence of nodes where each pair of adjacent nodes
has a parent-child connection. A path can start and end at any node,
and it does not need to pass through the root.

Return the maximum path sum of any path in the tree.

Constraints:
- Number of nodes: 1 to 3 * 10^4
- Node values can be negative
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
Implement maxPathSum(root)

Requirements:
- Use DFS recursion (postorder style)
- Track a global maximum path sum
- For each node, compute the best gain from left and right
- Do not include negative gains when extending a path
- Update global max using a path that goes left -> node -> right
- Return to parent only a single-branch gain (node + max(leftGain, rightGain))
*/
function maxPathSum(root) {
  let maxSum = -Infinity;

  function dfsPostorder(node) {
    if(!node) return 0;

    let leftGain  = Math.max(dfsPostorder(node.left), 0),
        rightGain = Math.max(dfsPostorder(node.right), 0);

    let pathThroughNode = node.val + leftGain + rightGain;

    maxSum = Math.max(maxSum, pathThroughNode);
    
    return node.val + Math.max(leftGain, rightGain);
  }  
  dfsPostorder(root);
  return maxSum;
}


/* =======================
   Test Cases (Input/Output)
   ======================= */

// Example 1
// Tree:
//        1
//       / \
//      2   3
const root1 = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3)
);

console.log(maxPathSum(root1));
// Expected Output: 6


// Example 2
// Tree:
//        -10
//        /  \
//       9    20
//           /  \
//          15   7
const root2 = new TreeNode(
  -10,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(maxPathSum(root2));
// Expected Output: 42


// Example 3
// Tree:
//        -3
const root3 = new TreeNode(-3);

console.log(maxPathSum(root3));
// Expected Output: -3


// Example 4
// Tree:
//        5
//       / \
//     -2   6
const root4 = new TreeNode(
  5,
  new TreeNode(-2),
  new TreeNode(6)
);

console.log(maxPathSum(root4));
// Expected Output: 11
