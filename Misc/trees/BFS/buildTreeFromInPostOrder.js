// LeetCode #106 – Construct Binary Tree from Inorder and Postorder Traversal

/*
Problem: Construct Binary Tree from Inorder and Postorder Traversal

Given two integer arrays inorder and postorder where:
- inorder is the inorder traversal of a binary tree
- postorder is the postorder traversal of the same tree

Construct and return the binary tree.

Constraints:
- 1 <= inorder.length <= 3000
- postorder.length == inorder.length
- All values are unique
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
Implement a function to construct a binary tree from inorder and postorder arrays.

Requirements:
- Use recursion (DFS)
- The last element in postorder is always the root
- Use inorder to determine left and right subtrees
- Avoid slicing arrays repeatedly
- Use indices and a hashmap for efficiency
- Return the root of the constructed tree
*/
function buildTree(inorder, postorder) {
  // TODO
  if(!inorder && !postorder) return null;

  let inorderMap = new Map(),
      postOrderIndex = postorder.length - 1;

  inorder.forEach((value, index) => inorderMap.set(value, index));

  function buildSubTree(inLeft, inRight) {
    if(inLeft > inRight) return null;

    let rootVal = postorder[postOrderIndex--],
        root    = new TreeNode(rootVal);

    let rootIndexInInorder = inorderMap.get(rootVal);

    root.right = buildSubTree(rootIndexInInorder + 1, inRight)
    root.left = buildSubTree(inLeft, rootIndexInInorder - 1);

    return root;
  }

  return buildSubTree(0, inorder.length - 1);
}

/* =======================
   Test Cases (Input/Output)
   ======================= */

// Example 1
const inorder1 = [9, 3, 15, 20, 7];
const postorder1 = [9, 15, 7, 20, 3];

const tree1 = buildTree(inorder1, postorder1);
// Expected Tree Structure:
//        3
//       / \
//      9  20
//         / \
//        15  7

console.log(tree1);


// Example 2
const inorder2 = [1];
const postorder2 = [1];

const tree2 = buildTree(inorder2, postorder2);
// Expected Tree:
//        1

console.log(tree2);


// Example 3
const inorder3 = [2, 1];
const postorder3 = [2, 1];

const tree3 = buildTree(inorder3, postorder3);
// Expected Tree:
//        1
//       /
//      2

console.log(tree3);

