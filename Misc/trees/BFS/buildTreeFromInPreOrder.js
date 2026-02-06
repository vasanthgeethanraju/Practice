// LeetCode #105 – Construct Binary Tree from Preorder and Inorder Traversal

/*
Problem: Construct Binary Tree from Preorder and Inorder Traversal

Given two integer arrays preorder and inorder where:
- preorder is the preorder traversal of a binary tree
- inorder is the inorder traversal of the same tree

Construct and return the binary tree.

Constraints:
- 1 <= preorder.length <= 3000
- inorder.length == preorder.length
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
Implement a function to construct a binary tree from preorder and inorder arrays.

Requirements:
- Use recursion (DFS)
- The first element in preorder is always the root
- Use inorder to determine left and right subtrees
- Avoid slicing arrays repeatedly
- Use indices and a hashmap for efficiency
- Return the root of the constructed tree
*/
function buildTree(preorder, inorder) {
  // TODO
  if(!preorder && !inorder) return null;

  let inOrderMap = new Map(), preorderIndex = 0;

  inorder.forEach((value, index) => inOrderMap.set(value, index));


  function buildSubTree(inLeft, inRight) {
    if(inLeft > inRight) return null;

    let rootVal          = preorder[preorderIndex++],
        root             = new TreeNode(rootVal),
        rootValInInorder = inOrderMap.get(rootVal);

    root.left = buildSubTree(inLeft, rootValInInorder - 1);
    root.right = buildSubTree(rootValInInorder + 1, inRight);

    return root;
  }

  return buildSubTree(0, inorder.length - 1);
}

/* =======================
   Test Cases (Input/Output)
   ======================= */

// Example 1
const preorder1 = [3, 9, 20, 15, 7];
const inorder1  = [9, 3, 15, 20, 7];

const tree1 = buildTree(preorder1, inorder1);
// Expected Tree Structure:
//        3
//       / \
//      9  20
//         / \
//        15  7

console.log(tree1);


// Example 2
const preorder2 = [1];
const inorder2  = [1];

const tree2 = buildTree(preorder2, inorder2);
// Expected Tree:
//        1

console.log(tree2);


// Example 3
const preorder3 = [1, 2];
const inorder3  = [2, 1];

const tree3 = buildTree(preorder3, inorder3);
// Expected Tree:
//        1
//       /
//      2

console.log(tree3);
