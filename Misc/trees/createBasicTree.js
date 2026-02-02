//   10
//  /  \
// 5    20
//     /
//    15
// A basic TreeNode structure
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

// TODO 1: Create the tree shown above manually using TreeNode
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
// TODO 2: Identify and log the root node

function findRoot(root) {
  return root.val;
}

console.log("Root is- ", findRoot(root));
// TODO 3: Identify all leaf nodes

let leafNodes = [];

function findLeafNodes(node) {
  if(!node) return;

  if(!node.left && !node.right) {
    leafNodes.push(node.val);
  }

  findLeafNodes(node.left);
  findLeafNodes(node.right);
}
findLeafNodes(root);

console.log("Leaf Nodes - ", leafNodes);
// TODO 4: Print the parent of node with value 15

console.log("Parent node of 15 - ", root.right.val);
// TODO 5: Print all nodes in the subtree rooted at 20

function printSubtree(node) {
  if(!node) return;

  console.log("Nodes in the subtree rooted at 20 - ", node.val);
  printSubtree(node.left);
  printSubtree(node.right);
}

printSubtree(root.right);