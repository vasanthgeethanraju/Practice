// Leetcode #938 – Range Sum of BST

// ------------------ Boilerplate ------------------
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper to build BST
function insertBST(root, val) {
  if (!root) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertBST(root.left, val);
  } else {
    root.right = insertBST(root.right, val);
  }
  return root;
}

function buildBST(values) {
  let root = null;
  for (const v of values) {
    root = insertBST(root, v);
  }
  return root;
}

/*
TODO:
Implement rangeSumBST(root, low, high)

Goal:
- Return the sum of all node values such that:
    low <= node.val <= high

High-level plan (pseudocode hints):
- Use DFS
- At each node:
    - If node.val < low:
        - skip left subtree
        - recurse only right
    - Else if node.val > high:
        - skip right subtree
        - recurse only left
    - Else:
        - include node.val in sum
        - recurse both left and right

Rules:
- Use BST ordering to PRUNE
- Do NOT traverse entire tree blindly

Example:
BST built from [10,5,15,3,7,18]
low = 7, high = 15
Expected sum = 32
*/
function rangeSumBST(root, low, high) {
  // TODO
  if(!root) return 0;

  if(root.val < low) {
    return rangeSumBST(root.right, low, high);
  } else if(root.val > high) {
    return rangeSumBST(root.left, low, high);
  } else {
    return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
    // return (1 + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high));
  }
}

// ------------------ Tests ------------------
const root = buildBST([10,5,15,3,7,18]);

console.log(rangeSumBST(root, 7, 15)); // expected 32
console.log(rangeSumBST(root, 6, 10)); // expected 22 (7 + 10 + 5? no -> 7 + 10 = 17 actually, think!)
console.log(rangeSumBST(root, 15, 18)); // expected 33
console.log(rangeSumBST(root, 20, 30)); // expected 0
