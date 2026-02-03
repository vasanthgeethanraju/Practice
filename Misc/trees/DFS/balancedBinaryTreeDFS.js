// LeetCode 110 - Balanced Binary Tree.
// Definition for a binary tree node.
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper: build a tree from level-order array (LeetCode style)
// Example: [1,2,3,null,4] 
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
Implement isBalanced(root)

Requirements:
- Use DFS recursion (postorder style) because you need children's heights first
- Create a helper dfs(node) that returns:
  - the height of the subtree if it's balanced
  - OR a sentinel value like -1 if it's unbalanced
- Base case:
  - null node has height 0
- For each node:
  1) get leftHeight = dfs(node.left)
     - if leftHeight is -1, return -1 early
  2) get rightHeight = dfs(node.right)
     - if rightHeight is -1, return -1 early
  3) if abs(leftHeight - rightHeight) > 1, return -1
  4) otherwise return 1 + max(leftHeight, rightHeight)
- Final answer:
  - tree is balanced if dfs(root) != -1

Input/Output tests:
1) root = [3,9,20,null,null,15,7] -> true
2) root = [1,2,2,3,3,null,null,4,4] -> false
3) root = [] -> true
4) root = [1] -> true
*/
function isBalanced(root) {
  // TODO
  function dfsPostOrder(node) {
    if(!node) return 0;

    let leftHeight = dfsPostOrder(node.left), rightHeight = dfsPostOrder(node.right);

    if(leftHeight  === -1 || rightHeight === -1) return -1;

    if(Math.abs(leftHeight - rightHeight) > 1) return -1;

    return 1 + Math.max(leftHeight, rightHeight);
  }

  return dfsPostOrder(root) !== -1;
}

// ------------------ Tests ------------------
const t1 = buildTree([3, 9, 20, null, null, 15, 7]);
console.log(isBalanced(t1)); // expected true

const t2 = buildTree([1, 2, 2, 3, 3, null, null, 4, 4]);
console.log(isBalanced(t2)); // expected false

const t3 = buildTree([]);
console.log(isBalanced(t3)); // expected true

const t4 = buildTree([1]);
console.log(isBalanced(t4)); // expected true