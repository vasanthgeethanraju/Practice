// LeetCode Problem: #700 Search in a Binary Search Tree
// ------------------ Boilerplate ------------------

// Definition for a binary tree node.
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: insert a value into a BST (used only to build test trees)
function insertBST(root, val) {
  if (root === null) return new TreeNode(val);

  let curr = root;
  while (true) {
    if (val < curr.val) {
      if (curr.left === null) {
        curr.left = new TreeNode(val);
        break;
      }
      curr = curr.left;
    } else {
      if (curr.right === null) {
        curr.right = new TreeNode(val);
        break;
      }
      curr = curr.right;
    }
  }

  return root;
}

// Build a BST from an array of values (in insertion order)
function buildBST(values) {
  let root = null;
  for (const v of values) {
    root = insertBST(root, v);
  }
  return root;
}

// ------------------ TODO Problem ------------------
/*
TODO:
Implement searchBST(root, val)

Goal:
- Given the root of a BST and an integer val,
  return the node where node.val === val, or null if it doesn't exist.

BST properties you must use:
- If val === node.val → return node
- If val < node.val → search LEFT subtree
- If val > node.val → search RIGHT subtree

Rules:
- Do NOT scan both subtrees
- Do NOT use full DFS that visits everything
- At each step, eliminate half the tree using ordering

Edge cases:
- root is null
- val not present in tree

Test tree to reason about (built via insert order):
Insert: [8, 3, 10, 1, 6, 14]

BST shape will be:
        8
       / \
      3   10
     / \    \
    1   6    14

Expected:
- searchBST(root, 6)  → node with val 6
- searchBST(root, 7)  → null
- searchBST(root, 8)  → node with val 8
- searchBST(root, 14) → node with val 14
*/
function searchBST(root, val) {
  // TODO
  if(!root) return null;

  if(root.val === val) return root;
  if(val < root.val) {
    return searchBST(root.left, val);
  } else if(val > root.val) return searchBST(root.right, val);
}

// ------------------ Tests ------------------
const root = buildBST([8, 3, 10, 1, 6, 14]);

const a = searchBST(root, 6);
console.log(a ? a.val : null); // expected 6

const b = searchBST(root, 7);
console.log(b ? b.val : null); // expected null

const c = searchBST(root, 8);
console.log(c ? c.val : null); // expected 8

const d = searchBST(root, 14);
console.log(d ? d.val : null); // expected 14

const e = searchBST(null, 1);
console.log(e ? e.val : null); // expected null

