function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

// ============================
// Test Case 1 (should be true)

// root:
//        3
//       / \
//      4   5
//     / \
//    1   2

// subRoot:
//      4
//     / \
//    1   2

// Expected: true
// ==========================

const root1 = new TreeNode(3);
root1.left = new TreeNode(4);
root1.right = new TreeNode(5);
root1.left.left = new TreeNode(1);
root1.left.right = new TreeNode(2);

const sub1 = new TreeNode(4);
sub1.left = new TreeNode(1);
sub1.right = new TreeNode(2);

// ================================
// Test Case 2 (should be false)
//
// root:
//        3
//       / \
//      4   5
//     / \
//    1   2
//       /
//      0
//
// subRoot:
//      4
//     / \
//    1   2
//
// Expected: false
// Explanation: root has extra node 0 under the 2, so it’s not an exact match.
// ================================
const root2 = new TreeNode(3);
root2.left = new TreeNode(4);
root2.right = new TreeNode(5);
root2.left.left = new TreeNode(1);
root2.left.right = new TreeNode(2);
root2.left.right.left = new TreeNode(0);

const sub2 = new TreeNode(4);
sub2.left = new TreeNode(1);
sub2.right = new TreeNode(2);

// ================================
// TODO: IMPLEMENT THIS FUNCTION
// ================================
function isSubtree(root, subRoot) {
  // TODO 1: If subRoot is null, return true (empty tree is always a subtree)

  // TODO 2: If root is null but subRoot is not null, return false

  // TODO 3: Define a helper function sameTree(a, b)
  // - It should return true only if both trees match exactly in structure + values
  // - Handle nulls properly
  // - Recurse left and right

  // TODO 4: At the current root node:
  // - If sameTree(root, subRoot) is true, return true

  // TODO 5: Otherwise, recursively check:
  // - isSubtree(root.left, subRoot)
  // - isSubtree(root.right, subRoot)

  // TODO 6: Return true if either left or right recursion returns true

  if (!subRoot) return true;

  if (!root && subRoot) return false;

  function sameTree(a, b) {
    if(!a && !b) return true;

    if(!a || !b) return false;

    if(a.val !== b.val) return false;

    return sameTree(a.left, b.left) && sameTree(a.right, b.right);
  }

  if(sameTree(root, subRoot)) return true;

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

// ============
// Test calls
// ============
console.log(isSubtree(root1, sub1)); // expected: true
console.log(isSubtree(root2, sub2)); // expected: false