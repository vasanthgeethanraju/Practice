// LeetCode #102 – Binary Tree Level Order Traversal
/*
Problem: Binary Tree Level Order Traversal (BFS)

Given the root of a binary tree, return the level order traversal
of its nodes’ values. Level order traversal means traversing the
tree level by level, from left to right.

Return an array of arrays, where each inner array contains
the values of the nodes at that level.

Constraints:
- Number of nodes: 0 to 10^4
- Tree may be empty
- Node values are integers
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
Implement level order traversal using BFS.

Requirements:
- Use a queue
- Traverse the tree level by level (left to right)
- Each level should be collected into its own array
- Return an array of arrays
- Do NOT use recursion
- Handle the case when the tree is empty
*/
function levelOrder(root) {
  // TODO
  if(!root) return [];

  let queue = [];
  queue.push(root);
  let res = [];

  while(queue.length > 0) {
    let levelSize = queue.length, currentLevel = [];

    for(let i =0; i< levelSize; i++) {
      let currentNode = queue.shift();

      if(currentNode) {
        currentLevel.push(currentNode.val);

        if(currentNode.left) queue.push(currentNode.left);
        if(currentNode.right) queue.push(currentNode.right);
      }
    }
    res.push(currentLevel);
  }
  return res;
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

console.log(levelOrder(root1));
// Expected Output: [[1], [2, 3]]


// Example 2
// Tree:
//        1
//       / \
//      2   3
//     / \     \
//    4   5     6
const root2 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(6))
);

console.log(levelOrder(root2));
// Expected Output: [[1], [2, 3], [4, 5, 6]]


// Example 3
// Tree: empty
console.log(levelOrder(null));
// Expected Output: []


// Example 4
// Tree:
//        1
const root3 = new TreeNode(1);

console.log(levelOrder(root3));
// Expected Output: [[1]]
