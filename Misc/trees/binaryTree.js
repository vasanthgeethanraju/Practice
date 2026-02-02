//       10
//     /    \
//    5      15
//   / \
//  3   7
// A basic TreeNode structure
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

// TODO 1: Construct the tree shown above
const root = new TreeNode(10);
root.left  = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);

// TODO 2: Write a function isLeaf(node)
// returns true if node has no children
function isLeaf(node) {
  if(!node) return false;

  return !node.left && !node.right;
}

console.log(isLeaf(root));  // false (node 10 has children)
console.log(isLeaf(root.left));  // false (node 5 has children)
console.log(isLeaf(root.right));  // true (node 15 is a leaf)
console.log(isLeaf(root.left.left));  // true (node 3 is a leaf)
console.log(isLeaf(root.left.right)); // true (node 7 is a leaf)
// TODO 3: Write a function countChildren(node)
// returns how many children a node has (0, 1, or 2)
function countChildren(node) {
  let count = 0;

  if(!node) return 0;

  if(node.left) count++;
  if(node.right) count++;

  return `${count} children`;
}

console.log(countChildren(root));            // Node 10 → 2 children (has left 5 and right 15)
console.log(countChildren(root.left));       // Node 5 → 2 children (has left 3 and right 7)
console.log(countChildren(root.right));      // Node 15 → 0 children (no children)
console.log(countChildren(root.left.left));  // Node 3 → 0 children (leaf node)
console.log(countChildren(root.left.right)); // Node 7 → 0 children (leaf node)

// TODO 4: Traverse the tree and print each node with its child count
// Example output:
// Node 10 → 2 children
// Node 5 → 2 children
// Node 15 → 0 children
function printTreeNodes (node){
  if(!node) return;
  let count = 0;


  if(node.left) count++;
  if(node.right) count++;


  console.log(`Node ${node.val} -> ${count} children`);

  printTreeNodes(node.left);
  printTreeNodes(node.right);
};

printTreeNodes(root);