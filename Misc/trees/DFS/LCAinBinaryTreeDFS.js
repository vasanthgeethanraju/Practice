// LeetCode #236 – Lowest Common Ancestor of a Binary Tree
// Definition for a binary tree node.
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/*
TODO:
Implement lowestCommonAncestor(root, p, q)

Goal:
- Return the TreeNode that is the lowest common ancestor (LCA) of nodes p and q
- Tree is a normal Binary Tree (NOT BST)

High-level DFS reasoning (pseudocode-style hints, not code):
- If current node is null → return null
- If current node is p or q → return current node
- Recurse left → leftResult
- Recurse right → rightResult
- If leftResult != null AND rightResult != null:
    - current node is the LCA → return current node
- Else:
    - return whichever of leftResult or rightResult is not null
    - (or null if both are null)

Important:
- Do NOT use value comparisons
- Do NOT store root-to-node paths
- Use DFS return values to bubble information upward

Test cases:
Use this tree:

            3
           / \
          5   1
         / \   \
        6   2   8

1) p=6, q=2  → LCA should be 5
2) p=6, q=8  → LCA should be 3
3) p=5, q=6  → LCA should be 5 (a node can be ancestor of itself)
*/
function lowestCommonAncestor(root, p, q) {
  // TODO
  function dfs(node) {
    if(!node) return null;

    if(node === p || node === q) return node;

    let leftResult = dfs(node.left);
    let rightResult = dfs(node.right);

    if(leftResult && rightResult) {
      return node;
    } else {
      return leftResult ? leftResult : rightResult;
    }
  }

  return dfs(root);
}

// ------------------ Build a specific test tree ------------------
const n6 = new TreeNode(6);
const n2 = new TreeNode(2);
const n5 = new TreeNode(5, n6, n2);

const n8 = new TreeNode(8);
const n1 = new TreeNode(1, null, n8);

const root = new TreeNode(3, n5, n1);

// ------------------ Tests ------------------
const ans1 = lowestCommonAncestor(root, n6, n2);
console.log(ans1 ? ans1.val : null); // expected 5

const ans2 = lowestCommonAncestor(root, n6, n8);
console.log(ans2 ? ans2.val : null); // expected 3

const ans3 = lowestCommonAncestor(root, n5, n6);
console.log(ans3 ? ans3.val : null); // expected 5
