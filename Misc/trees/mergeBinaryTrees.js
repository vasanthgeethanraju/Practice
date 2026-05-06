class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(level) {
  if (!level || level.length === 0 || level[0] == null) return null;

  const root = new TreeNode(level[0]);
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < level.length) {
    const node = queue.shift();

    const leftVal = level[i++];
    if (leftVal != null) {
      node.left = new TreeNode(leftVal);
      queue.push(node.left);
    }

    if (i >= level.length) break;

    const rightVal = level[i++];
    if (rightVal != null) {
      node.right = new TreeNode(rightVal);
      queue.push(node.right);
    }
  }

  return root;
}

function toLevelOrderArray(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  while (result.length > 0 && result[result.length - 1] == null) {
    result.pop();
  }

  return result;
}

function mergeTrees(root1, root2) {
  if (root1 === null) return root2;
  if (root2 === null) return root1;

  root1.val += root2.val;
  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);

  return root1;
}

// Test case 1
console.log(
  toLevelOrderArray(
    mergeTrees(
      buildTree([1, 3, 2, 5]),
      buildTree([2, 1, 3, null, 4, null, 7])
    )
  )
); // expected: [3, 4, 5, 5, 4, null, 7]

// Test case 2
console.log(
  toLevelOrderArray(
    mergeTrees(
      buildTree([1]),
      buildTree([1, 2])
    )
  )
); // expected: [2, 2]

// Test case 3
console.log(
  toLevelOrderArray(
    mergeTrees(
      buildTree([1, null, 2]),
      buildTree([3, 4, null])
    )
  )
); // expected: [4, 4, 2]

// Test case 4
console.log(toLevelOrderArray(mergeTrees(null, buildTree([1, 2, 3])))); // expected: [1, 2, 3]

// Test case 5
console.log(toLevelOrderArray(mergeTrees(null, null))); // expected: []
