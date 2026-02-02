// Build this exact tree:
//     1
//    / \
//   2   3
//  / \
// 4   5
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

function preorderIterative(root) {
  // TODO: create an empty array result
  // TODO: if root is null, return result
  // TODO: create a stack and push root
  // TODO: while stack is not empty
  // TODO: pop a node from stack
  // TODO: add node.val to result
  
  // TODO: if node.right exists, push it to stack
  // TODO: if node.left exists, push it to stack
  // TODO: return result
  let result = [];
  if(!root) return result;
  let stack = [];

  stack.push(root);
  while(stack.length > 0) {
    let node = stack.pop();
    result.push(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}

function inorderIterative(root) {
  // TODO: create an empty array result
  // TODO: create an empty stack
  // TODO: set current = root

  // TODO: while current is not null OR stack is not empty
    // TODO: while current is not null
      // TODO: push current onto stack
      // TODO: move current to current.left

    // TODO: pop a node from stack and store it in current
    // TODO: process current node (push current.val into result)
    // TODO: move current to current.right

  // TODO: return result

  let result = [], stack = [], curr = root;

  while(curr !== null || stack.length > 0) {
    while(curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }

  return result;
}

function postorderIterative(root) {
  // TODO: create an empty array result
  // TODO: if root is null, return result

  // TODO: create stack1
  // TODO: create stack2

  // TODO: push root into stack1

  // TODO: while stack1 is not empty
    // TODO: pop a node from stack1
    // TODO: push this node into stack2

    // TODO: if node.left exists, push it into stack1
    // TODO: if node.right exists, push it into stack1

  // TODO: while stack2 is not empty
    // TODO: pop node from stack2
    // TODO: push node.val into result

  // TODO: return result

  let res = [], stack1 = [], stack2 = [];

  if (!root) return res;

  stack1.push(root);

  while(stack1.length > 0) {
    let node = stack1.pop();

    stack2.push(node);

    if(node.left) stack1.push(node.left);
    if(node.right) stack1.push(node.right);
  }

  while(stack2.length > 0) {
    res.push(stack2.pop().val);
  }

  return res;
}

// Expected Output
// preorder: [1, 2, 4, 5, 3]
// inorder: [4, 2, 5, 1, 3]
// postorder: [4, 5, 2, 3, 1]

console.log("Preorder Iterative- ", preorderIterative(root))
console.log("inorder Iterative- ", inorderIterative(root))
console.log("postorder Iterative- ", postorderIterative(root))