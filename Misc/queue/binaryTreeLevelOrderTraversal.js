// Binary Tree Level Order Traversal
// Queue = process nodes level by level (Breadth First Search).
// You collect values in groups based on depth.
// Sample Input / Output
// Input tree:

//     1
//    / \
//   2   3
//  / \   \
// 4   5   6

// Output:

// [[1], [2, 3], [4, 5, 6]]
function levelOrder(root) {
  // TODO 1: If root is empty, return empty array
  if (!root) {
    return [];
  }
  // TODO 2: Create a result list to store all levels
  const result = [];
  // TODO 3: Create a queue and put root into it
  //         (use head pointer approach)
  const queue = [root];
  // TODO 4: While queue has nodes:
  //    - Determine how many nodes belong to the current level
  //    - Create a list to store current level values
  //    - Repeat "level size" times:
  //        - Remove one node from the queue
  //        - Add its value to the current level list
  //        - If it has left child, add to queue
  //        - If it has right child, add to queue
  while (queue.length > 0) {
    const levelValues = [];

    for (let i = 0; i < queue.length; i++) {
      const node = queue.shift();
      
      levelValues.push(node.val);

      if (node.left) queue.push(node.left);

      if (node.right) queue.push(node.right);
    }

    // Push the current level list into result
    result.push(levelValues);
  }

  // TODO 5: Return result
  return result;
}

// Sample tree construction
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

// Creating the sample tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);

// Call the function and log the output
console.log(levelOrder(root));