// Leetcode #230 – Kth Smallest Element in a BST
// ------------------ Boilerplate ------------------
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: insert values to build a BST
function insertBST(root, val) {
  if (root === null) return new TreeNode(val);

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
Implement kthSmallest(root, k)

High-level plan (pseudocode hints, not code):
- Use inorder traversal (Left → Node → Right)
- Maintain a counter that increments on each visited node
- When counter === k:
    - record the node value as the answer
    - stop further traversal (early exit)
- Return the recorded value

Rules:
- k is 1-indexed
- Do NOT sort values
- Do NOT traverse entire tree if not needed

Example:
BST built from [5,3,6,2,4,1]
Inorder: [1,2,3,4,5,6]

k = 3 → return 3
*/
function kthSmallest(root, k) {
  // TODO
  let count = 0;
  let result = null;

  function inorder(node) {
    if(!node || result !== null) return;

    inorder(node.left);
    count++;

    if(count === k) {
      result = node.val;
      return;
    }
    inorder(node.right);
  }

  inorder(root);
  return result;
}

// ------------------ Tests ------------------
const root = buildBST([8, 3, 6, 2, 4, 1]);

console.log(kthSmallest(root, 1)); // expected 1
console.log(kthSmallest(root, 3)); // expected 3
console.log(kthSmallest(root, 5)); // expected 5
