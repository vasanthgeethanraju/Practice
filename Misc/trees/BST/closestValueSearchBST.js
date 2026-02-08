// Leetcode #272 – Closest Binary Search Tree Value II

// Definition for a binary tree node.
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: insert values to build a BST for testing
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
Implement closestKValues(root, target, k) for LC 272

Goal:
- Return an array of k values in the BST that are closest to target

Optimal approach (pseudocode hints, not actual code):
1) Build two stacks:
   - preds stack: nodes with val <= target (candidate predecessors)
   - succs stack: nodes with val > target (candidate successors)

   How to build preds:
   - Start at root
   - While node exists:
       - If node.val <= target:
           - push node to preds
           - move node = node.right (try to get closer from the right side)
       - else:
           - move node = node.left

   How to build succs:
   - Start at root
   - While node exists:
       - If node.val > target:
           - push node to succs
           - move node = node.left (try to get closer from the left side)
       - else:
           - move node = node.right

2) Helper to get next predecessor:
   - Pop top node from preds (call it n)
   - The next predecessor comes from n.left, then go right as far as possible,
     pushing nodes along the way into preds
   - Return n.val

3) Helper to get next successor:
   - Pop top node from succs (call it n)
   - The next successor comes from n.right, then go left as far as possible,
     pushing nodes along the way into succs
   - Return n.val

4) Build answer of length k:
   - Repeat k times:
       - If preds empty -> take successor
       - Else if succs empty -> take predecessor
       - Else compare:
           abs(predsTop.val - target) vs abs(succsTop.val - target)
           take the closer one

Notes:
- This behaves like two pointers around target in a sorted list, but without building the list.
- Time: about O(h + k), Space: O(h), where h is tree height.
*/
function closestKValues(root, target, k) {
  // TODO
  let preds = [], succs = [];

  // Step 1: Build preds stack (predecessors)
  let node = root;
  while (node) {
    if (node.val <= target) {
      preds.push(node);
      node = node.right;  // move right for closer potential predecessors
    } else {
      node = node.left;   // move left to find smaller values
    }
  }

  // Step 2: Build succs stack (successors)
  node = root;
  while (node) {
    if (node.val > target) {
      succs.push(node);
      node = node.left;   // move left for closer potential successors
    } else {
      node = node.right;  // move right to find larger values
    }
  }

  // Helper to get the next predecessor
  function getPredecessor() {
    if (preds.length === 0) return null;
    const node = preds.pop();
    let n = node.left;
    while (n) {
      preds.push(n);
      n = n.right;
    }
    return node.val;
  }

  // Helper to get the next successor
  function getSuccessor() {
    if (succs.length === 0) return null;
    const node = succs.pop();
    let n = node.right;
    while (n) {
      succs.push(n);
      n = n.left;
    }
    return node.val;
  }

  // Step 3: Build the result array with k closest values
  const result = [];
  for (let i = 0; i < k; i++) {
    if (preds.length === 0) {
      result.push(getSuccessor());
    } else if (succs.length === 0) {
      result.push(getPredecessor());
    } else {
      const predVal = Math.abs(preds[preds.length - 1].val - target);
      const succVal = Math.abs(succs[succs.length - 1].val - target);
      if (predVal <= succVal) {
        result.push(getPredecessor());
      } else {
        result.push(getSuccessor());
      }
    }
  }

  return result;
}

// ------------------ Tests ------------------
const root = buildBST([4, 2, 5, 1, 3, 6]);

console.log(closestKValues(root, 3.714, 2));
// expected: [4, 3] (or [3, 4])

console.log(closestKValues(root, 3.714, 3));
// expected: [4, 3, 5] in some order where these are the 3 closest

console.log(closestKValues(root, 0, 2));
// expected: [1, 2] (or [2, 1])

console.log(closestKValues(root, 10, 2));
// expected: [6, 5] (or [5, 6])
