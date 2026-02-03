// LeetCode #112 & #113 - Path Sum I & II
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
Implement pathSumTools(root, targetSum)

Goal:
- Return BOTH answers for:
  - LC112: hasPath (boolean) - does ANY root-to-leaf path sum to targetSum?
  - LC113: paths (array of arrays) - ALL root-to-leaf paths that sum to targetSum

High-level plan (pseudocode-style hints, not code):
- Create:
  - hasPath = false
  - paths = []
  - path = [] (current path values)

- Define dfs(node, runningSum):
  - If node is null: return
  - Add node.val to runningSum
  - Push node.val to path
  - If node is a leaf:
      - If runningSum === targetSum:
          - set hasPath = true
          - push a COPY of path into paths
  - Recurse left: dfs(node.left, runningSum)
  - Recurse right: dfs(node.right, runningSum)
  - Backtrack: pop from path

- Call dfs(root, 0)
- Return { hasPath, paths }

Requirements:
- Top-down DFS (process node, then children)
- Leaf check must be: node.left === null && node.right === null
- Must push a COPY of path when recording (to avoid mutation bugs)
- Must backtrack (path.pop()) after exploring children

Input/Output tests:
1) root = [5,4,8,11,null,13,4,7,2,null,null,5,1], target=22
   -> hasPath: true
   -> paths: [[5,4,11,2],[5,8,4,5]]

2) root = [1,2,3], target=5
   -> hasPath: false
   -> paths: []

3) root = [], target=0
   -> hasPath: false
   -> paths: []
*/
function pathSumTools(root, targetSum) {
  // TODO
  let hasPath = false, paths = [], path = [];

  function dfsHelper(node, runningSum) {
    if(!node) return;

    runningSum += node.val;
    path.push(node.val);

    if (node.left === null && node.right === null) {
      if (runningSum === targetSum) {
        hasPath = true;
        paths.push([...path]);
      }
    }
    dfsHelper(node.left, runningSum);
    dfsHelper(node.right, runningSum);
    path.pop();
  }

  dfsHelper(root, 0);
  return { hasPath, paths };
}

// ------------------ Tests ------------------
const t1 = buildTree([5,4,8,11,null,13,4,7,2,null,null,5,1]);
console.log(pathSumTools(t1, 22));
// expected:
// { hasPath: true, paths: [[5,4,11,2],[5,8,4,5]] }

const t2 = buildTree([1,2,3]);
console.log(pathSumTools(t2, 5));
// expected: { hasPath: false, paths: [] }

const t3 = buildTree([]);
console.log(pathSumTools(t3, 0));
// expected: { hasPath: false, paths: [] }

const t4 = buildTree([1, 2, 3]);
console.log(pathSumTools(t4, 3));
// expected: { hasPath: true, paths: [[1, 2]] }

const t5 = buildTree([5,4,8,11,null,13,4,7,2,null,null,5,1]);
console.log(pathSumTools(t5, 22));
// expected:
// { hasPath: true, paths: [[5,4,11,2],[5,8,4,5]] }
