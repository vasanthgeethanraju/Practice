// Leetcode #653 - Two Sum IV - Input is a BST
// Definition for a binary tree node.
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: insert into BST for building tests
function insertBST(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insertBST(root.left, val);
  else root.right = insertBST(root.right, val);
  return root;
}

function buildBST(values) {
  let root = null;
  for (const v of values) root = insertBST(root, v);
  return root;
}

/*
TODO:
Implement findTarget(root, k) for LC 653

Goal:
- Return true if there exist TWO different nodes in the BST whose values sum to k
- Otherwise return false

Approach (same as Two Sum with a Set/Map, but traverse tree):
- Create a Set called seen
- DFS (or BFS) traverse nodes:
    - For each node value x:
        - comp = k - x
        - if seen has comp: return true
        - add x to seen
    - Continue traversal
- If traversal ends, return false

Rules:
- Must not use the same node twice (the "check then add" order handles this)
- Can early return as soon as you find a match
*/
function findTarget(root, k) {
  // TODO
  let map = new Map();

  function dfs(node) {
    if(!node) return false;

    let comp = k - node.val;
    
    // if(map.has(comp)) return true;
    if(map.has(comp)) return [comp, node.val]; ;

    map.set(node.val, true);
    return dfs(node.left) || dfs(node.right);
  }

  return dfs(root);
}

// ------------------ Tests ------------------
const root1 = buildBST([5, 3, 6, 2, 4, 7]);
console.log(findTarget(root1, 9));  // expected true (2 + 7)
console.log(findTarget(root1, 28)); // expected false

const root2 = buildBST([2, 1, 3]);
console.log(findTarget(root2, 4));  // expected true (1 + 3)
console.log(findTarget(root2, 1));  // expected false (can't use same node twice)

console.log(findTarget(null, 5));   // expected false