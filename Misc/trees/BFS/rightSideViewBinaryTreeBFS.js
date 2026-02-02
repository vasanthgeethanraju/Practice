
// LeetCode #199
/*
Problem: Binary Tree Right Side View (BFS)

Given the root of a binary tree, imagine yourself standing on the
right side of the tree. Return the values of the nodes you can see,
ordered from top to bottom.

You should return one value per level: the rightmost node of that level.

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
Implement a function that returns the right side view of a binary tree.

Requirements:
- Use BFS (queue)
- Process the tree level by level
- For each level, capture ONLY the rightmost node
- Return an array of values (one per level)
- Do NOT use recursion
- Handle empty tree
*/
function rightSideView(root) {
  // TODO
  if(!root) return [];

  let queue = [], res = [];
  queue.push(root);

  while(queue.length > 0) {
    let levelSize = queue.length;

    for(let i =0; i<levelSize;i++) {
      let node = queue.shift();
  
      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
      
      if(i === levelSize - 1) {
        res.push(node.val);
      }
    }
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
//       \    \
//        5    4
const root1 = new TreeNode(
  1,
  new TreeNode(2, null, new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(4))
);

console.log(rightSideView(root1));
// Expected Output: [1, 3, 4]


// Example 2
// Tree:
//        1
//         \
//          3
const root2 = new TreeNode(
  1,
  null,
  new TreeNode(3)
);

console.log(rightSideView(root2));
// Expected Output: [1, 3]


// Example 3
// Tree: empty
console.log(rightSideView(null));
// Expected Output: []


// Example 4
// Tree:
//        1
const root3 = new TreeNode(1);

console.log(rightSideView(root3));
// Expected Output: [1]
