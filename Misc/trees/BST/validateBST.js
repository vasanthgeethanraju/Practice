// LeetCode #98 - Validate Binary Search Tree.
// ------------------ Boilerplate ------------------
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: build binary tree from level-order array (LeetCode style)
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
Implement isValidBST(root)

High-level plan (pseudocode hints, not code):
- Use DFS with bounds: dfs(node, min, max)
- If node is null: return true
- If node.val is NOT inside (min, max): return false
- Left subtree must be within (min, node.val)
- Right subtree must be within (node.val, max)
- Return leftValid && rightValid

Rules:
- Use STRICT inequalities:
  node.val > min AND node.val < max
- Start with min = -Infinity, max = Infinity
- Do NOT just compare immediate children

Test cases:
1) [2,1,3] -> true
2) [5,1,4,null,null,3,6] -> false  (3 is in right subtree of 5 but < 5)
3) [5,3,7,null,4,6,8] -> true
4) [5,3,7,null,6] -> false  (6 is in left subtree of 5 but > 5)
*/
function isValidBST(root) {
  // TODO
  if(!root) return true;

  let min = -Infinity, max = Infinity;

  function dfs(node, min, max) {
    if(!node) return true;

    if(node.val <= min || node.val >= max) return false;

    return dfs(node.left, min, node.val) && dfs(node.right, node.val, max);
  }

  return dfs(root, min, max); 
}

// ------------------ Tests ------------------
console.log(isValidBST(buildTree([2, 1, 3]))); // expected true
console.log(isValidBST(buildTree([5, 1, 4, null, null, 3, 6]))); // expected false
console.log(isValidBST(buildTree([5, 3, 7, null, 4, 6, 8]))); // expected true
console.log(isValidBST(buildTree([5, 3, 7, null, 6]))); // expected false