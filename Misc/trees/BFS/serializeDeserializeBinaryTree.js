// LeetCode #297 – Serialize and Deserialize Binary Tree
/*
Problem: Serialize and Deserialize Binary Tree (DFS Preorder)

Design an algorithm to serialize and deserialize a binary tree.

Serialization: convert a tree into a string.
Deserialization: convert the string back into the original tree.

Rules for this implementation:
- Use DFS preorder traversal
- Use '#' to represent null nodes
- Use ',' to separate tokens

Example:
Tree:
    1
   / \
  2   3
Serialized:
"1,2,#,#,3,#,#"

Requirements:
- serialize(root) returns a string
- deserialize(data) returns the root TreeNode
- After deserialize(serialize(root)), structure must match exactly
*/

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/*
TODO:
Implement serialize(root)

Requirements:
- Return a string encoding the tree
- Use preorder traversal (root, left, right)
- Use '#' for null pointers
- Separate tokens with commas
*/
function serialize(root) {
  // TODO
  let res = [];

  function preOrder(node) {
    if(!node) {
      res.push("#");
      return;
    }

    res.push(node.val.toString());
    preOrder(node.left);
    preOrder(node.right);
  }

  preOrder(root);
  return res.join(",");
}

/*
TODO:
Implement deserialize(data)

Requirements:
- data is a string produced by serialize
- Rebuild and return the exact original tree
- Use the same preorder order
- Use an index pointer while consuming tokens
*/
function deserialize(data) {
  // TODO
  let values = data.split(",");
  let index = 0; // Keep track of the current position in the array

  function buildTree() {
    // let val = values.shift();
    if (index >= values.length) return null;  // If we've processed all values

    let val = values[index];
    index++;  // Move to the next element

    if(val === "#") {
      return null;
    }

    let node = new TreeNode(parseInt(val));
    node.left = buildTree();
    node.right = buildTree();
    return node;
  }

  return buildTree();
}

/* =======================
   Test Cases (Input/Output)
   ======================= */

// Helper to compare trees (for testing only)
function isSameTree(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.val !== b.val) return false;
  return isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}

// Example 1
// Tree:
//        1
//       / \
//      2   3
//         /
//        4
const root1 = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3, new TreeNode(4), null)
);

const s1 = serialize(root1);
console.log("Serialized 1:", s1);

const rebuilt1 = deserialize(s1);
console.log("Rebuilt matches original 1:", isSameTree(root1, rebuilt1));
// Expected: true


// Example 2
// Tree: empty
const s2 = serialize(null);
console.log("Serialized 2:", s2);

const rebuilt2 = deserialize(s2);
console.log("Rebuilt matches original 2:", isSameTree(null, rebuilt2));
// Expected: true


// Example 3
// Tree:
//        7
const root3 = new TreeNode(7);

const s3 = serialize(root3);
console.log("Serialized 3:", s3);

const rebuilt3 = deserialize(s3);
console.log("Rebuilt matches original 3:", isSameTree(root3, rebuilt3));
// Expected: true


const root4 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const s4 = "1,2,#,#"; // Missing `3` node
console.log("Serialized 4:", s4);
const rebuilt = deserialize(s4);
console.log("Rebuilt matches original 4:", isSameTree(root4, rebuilt));  // Expected: false