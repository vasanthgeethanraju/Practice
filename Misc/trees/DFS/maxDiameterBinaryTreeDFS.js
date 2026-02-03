// LeetCode #543 - Diameter of Binary Tree
// Definition for a binary tree node.
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: build a tree from level-order array (LeetCode style)
function buildTree(level) {
  if (!level || level.length === 0 || level[0] == null) return null;

  const root = new TreeNode(level[0]);
  const q = [root];
  let i = 1;

  while (q.length && i < level.length) {
    const node = q.shift();

    const leftVal = level[i++];
    if (leftVal != null) {
      node.left = new TreeNode(leftVal);
      q.push(node.left);
    }

    if (i >= level.length) break;

    const rightVal = level[i++];
    if (rightVal != null) {
      node.right = new TreeNode(rightVal);
      q.push(node.right);
    }
  }

  return root;
}

/*
TODO:
Implement diameterOfBinaryTree(root)

Definition:
- Diameter = number of edges in the longest path between any two nodes
- Path can be anywhere, not necessarily through root

Requirements:
- Use DFS recursion (postorder style)
- Track a global maximum diameter (in edges)
- Helper dfs(node) should return the height of the subtree
  - Use height measured in "number of edges from node down to deepest leaf"
  - One clean convention:
    - dfs(null) returns 0 height (meaning: no edges)
    - For a real node:
      - leftHeight = dfs(node.left)
      - rightHeight = dfs(node.right)
      - Candidate diameter through this node = leftHeight + rightHeight
      - Update globalMax with that candidate
      - Return 1 + max(leftHeight, rightHeight) to parent

Input/Output tests:
1) root = [1,2,3,4,5] -> 3
2) root = [1,2] -> 1
3) root = [1] -> 0
4) root = [] -> 0
*/
function diameterOfBinaryTree(root) {
  // TODO
  let maxDiameter = 0;

  function dfsPostOrder(node) {
    if(!node) return 0;

    let leftHeight  = dfsPostOrder(node.left), rightHeight = dfsPostOrder(node.right);

    let diameter = leftHeight + rightHeight;

    maxDiameter = Math.max(maxDiameter, diameter);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  dfsPostOrder(root);
  return maxDiameter;
}

// ------------------ Tests ------------------
const a = buildTree([1, 2, 3, 4, 5]);
console.log(diameterOfBinaryTree(a)); // expected 3 (4-2-1-3)

const b = buildTree([1, 2]);
console.log(diameterOfBinaryTree(b)); // expected 1

const c = buildTree([1]);
console.log(diameterOfBinaryTree(c)); // expected 0

const d = buildTree([]);
console.log(diameterOfBinaryTree(d)); // expected 0