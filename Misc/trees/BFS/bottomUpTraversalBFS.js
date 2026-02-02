// Leetcode #107
/*
Problem: Binary Tree Level Order Traversal II (Bottom-Up) (BFS)

Given the root of a binary tree, return the level order traversal
of its nodes' values from bottom level to top level.

Each level should be an array of values.
Return an array of levels, ordered from bottom to top.

Constraints:
- Number of nodes: 0 to 10^4
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
Implement bottom-up level order traversal using BFS.

Requirements:
- Use a queue
- Process one level at a time using the queue's current size
- Collect each level as an array
- Return levels from bottom to top
- Do NOT use recursion
- Handle empty tree
*/
function levelOrderBottom(root) {
  // TODO

  if(!root) return [];

  let queue = [root], res = [];

  while(queue.length > 0) {
    let levelSize = queue.length, currentLevel = [];

    for(let i =0; i< levelSize; i++) {
      let currentNode = queue.shift();

      currentLevel.push(currentNode.val);

      if(currentNode.left) queue.push(currentNode.left);
      if(currentNode.right) queue.push(currentNode.right);
    }

    res.unshift(currentLevel);
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

console.log(levelOrderBottom(root1));
// Expected Output: [[15, 7], [9, 20], [3]]


// Example 2
// Tree:
//        1
//       / \
//      2   3
const root2 = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3)
);

console.log(levelOrderBottom(root2));
// Expected Output: [[2, 3], [1]]


// Example 3
// Tree: empty
console.log(levelOrderBottom(null));
// Expected Output: []


// Example 4
// Tree:
//        1
const root3 = new TreeNode(1);

console.log(levelOrderBottom(root3));
// Expected Output: [[1]]
