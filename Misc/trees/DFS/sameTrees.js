function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

// ================================
// Test Case 1: Same structure + values
// Tree A:    1        Tree B:    1
//           / \                / \
//          2   3              2   3
// Expected: true
// ================================
const a1 = new TreeNode(1);
a1.left = new TreeNode(2);
a1.right = new TreeNode(3);

const b1 = new TreeNode(1);
b1.left = new TreeNode(2);
b1.right = new TreeNode(3);

// ================================
// Test Case 2: Same structure, different value
// Tree A:    1        Tree B:    1
//           / \                / \
//          2   3              2   4
// Expected: false
// ================================
const a2 = new TreeNode(1);
a2.left = new TreeNode(2);
a2.right = new TreeNode(3);

const b2 = new TreeNode(1);
b2.left = new TreeNode(2);
b2.right = new TreeNode(4);

// ================================
// Test Case 3: Different structure
// Tree A:    1        Tree B:    1
//           /                    \
//          2                      2
// Expected: false
// ================================
const a3 = new TreeNode(1);
a3.left = new TreeNode(2);

const b3 = new TreeNode(1);
b3.right = new TreeNode(2);

// ================================
// TODO: IMPLEMENT THIS FUNCTION
// ================================
function isSameTree(p, q) {
  // TODO 1: If both nodes are null, the trees match at this position

  // TODO 2: If one node is null and the other is not, trees do NOT match

  // TODO 3: If both nodes exist but their values are different, trees do NOT match

  // TODO 4: Recursively compare left children of both trees

  // TODO 5: Recursively compare right children of both trees

  // TODO 6: Return true only if BOTH left and right subtree comparisons succeed

  // if(!p && !q) return true;
  
  // if(!p || !q) return false;
  
  // if(p.val !== q.val) return false;
  
  // return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  
  // same using stack
  
  if(!p && !q) return true;

  let stack = [[p, q]];

  while(stack.length > 0) {
    let [node1, node2] = stack.pop();

    if(!node1 && !node2) continue;

    if(!node1 || !node2) return false;

    if(node1.val !== node2.val) return false;

    stack.push([node1.left, node2.left]);
    stack.push([node1.right, node2.right]);
  }

  return true;
}

// ================================
// Function calls (test runner)
// ================================
console.log(isSameTree(a1, b1)); // expected: true
console.log(isSameTree(a2, b2)); // expected: false
console.log(isSameTree(a3, b3)); // expected: false
