// LeetCode #111 – Minimum Depth of Binary Tree
/*
Problem: Minimum Depth of Binary Tree (BFS)

The minimum depth is the number of nodes along the shortest path
from the root node down to the nearest leaf node.

A leaf node is a node with no left and no right child.

Return the minimum depth of the tree.

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
Implement a function to find the minimum depth of a binary tree using BFS.

Requirements:
- Use a queue
- Track depth while traversing
- Return depth immediately when a leaf node is encountered
- Do NOT traverse deeper once the answer is found
- Do NOT use recursion
- Handle empty tree
*/
function minDepth(root) {
  // TODO
  if(!root) return 0;

  let queue = [[root, 1]];

  while(queue.length > 0) {
    let [node, depth] = queue.shift();

    if(!node.left && !node.right) {
      return depth;
    }

    if(node.left) queue.push([node.left, depth + 1]);
    if(node.right) queue.push([node.right, depth + 1]);
  }
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

console.log(minDepth(root1));
// Expected Output: 2


// Example 2
// Tree:
//        1
//         \
//          2
//           \
//            3
const root2 = new TreeNode(
  1,
  null,
  new TreeNode(2, null, new TreeNode(3))
);

console.log(minDepth(root2));
// Expected Output: 3


// Example 3
// Tree: empty
console.log(minDepth(null));
// Expected Output: 0


// Example 4
// Tree:
//        1
const root3 = new TreeNode(1);

console.log(minDepth(root3));
// Expected Output: 1
