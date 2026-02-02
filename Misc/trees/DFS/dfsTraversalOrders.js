function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

// TODO 1: Construct the tree shown above and store the root in `root`
// root = 1
// root.left = 2
// root.right = 3
// root.left.left = 4
// root.left.right = 5

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

function preorder(root) {
  // TODO: create an array result
  // TODO: define a helper DFS function(node)
  // TODO: base case - if node is null, return
  // TODO: process current node (push node.val) BEFORE children
  // TODO: recurse left
  // TODO: recurse right
  let preOrder = [];
  function dfsPreOrder(node) {
    if(!node) return;

    preOrder.push(node.val);
    dfsPreOrder(node.left);
    dfsPreOrder(node.right);
  }
  // TODO: return result
  dfsPreOrder(root);
  return preOrder;
}

function inorder(root) {
  // TODO: create an array result
  // TODO: helper DFS(node)
  // TODO: base case - if node is null, return
  // TODO: recurse left
  // TODO: process current node (push node.val) BETWEEN left and right
  // TODO: recurse right
  // TODO: return result
  let inOrder = [];

  function dfsInOrder(node) {
  if(!node) return;

    dfsInOrder(node.left);
    inOrder.push(node.val);
    dfsInOrder(node.right);
  }
  // TODO: return result
  dfsInOrder(root);
  return inOrder;
}

function postorder(root) {
  // TODO: create an array result
  // TODO: helper DFS(node)
  // TODO: base case - if node is null, return
  // TODO: recurse left
  // TODO: recurse right
  // TODO: process current node (push node.val) AFTER children
  let postOrder = [];
  
  function dfsPostOrder(node) {
  if(!node) return;

    dfsPostOrder(node.left);
    dfsPostOrder(node.right);
    postOrder.push(node.val);
  }
  // TODO: return result
  dfsPostOrder(root);
  return postOrder;
}


// Expected Output
// preorder: [1, 2, 4, 5, 3]
// inorder: [4, 2, 5, 1, 3]
// postorder: [4, 5, 2, 3, 1]

console.log("Preorder- ", preorder(root))
console.log("inorder- ", inorder(root))
console.log("postorder- ", postorder(root))