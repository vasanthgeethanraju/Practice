// Leetcode #235 – Lowest Common Ancestor of a BST

// ------------------ Boilerplate ------------------
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: insert into BST for test building
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
Implement lowestCommonAncestorBST(root, p, q)

High-level plan (pseudocode hints):
- Start at root
- While current node exists:
    - If p.val < node.val AND q.val < node.val:
        move left
    - Else if p.val > node.val AND q.val > node.val:
        move right
    - Else:
        current node is the LCA → return it

Rules:
- Tree is a valid BST
- p and q are guaranteed to exist
- p and q are TreeNode references
- Use ordering, NOT DFS bubble-up

Test cases:
BST built from [6,2,8,0,4,9,3,5]

1) p=2, q=8 → LCA = 6
2) p=2, q=4 → LCA = 2
3) p=3, q=5 → LCA = 4
*/
function lowestCommonAncestorBST(root, p, q) {
  // TODO
  while(root) {
    if(p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if(p.val > root.val && q.val > root.val) {
      root = root.right;
    } else{
      return root;
    }
  }

  return root;
}

// ------------------ Tests ------------------
const root = buildBST([6,2,8,0,4,9,3,5]);

// manually grab nodes
const p1 = root.left;            // 2
const q1 = root.right;           // 8

const p2 = root.left;            // 2
const q2 = root.left.right;      // 4

const p3 = root.left.right.left; // 3
const q3 = root.left.right.right;// 5

console.log(lowestCommonAncestorBST(root, p1, q1).val); // expected 6
console.log(lowestCommonAncestorBST(root, p2, q2).val); // expected 2
console.log(lowestCommonAncestorBST(root, p3, q3).val); // expected 4
