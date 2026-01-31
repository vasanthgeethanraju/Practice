// ===============================
// Doubly Linked List Node Definition
// ===============================
class DoublyListNode {
  constructor(data = 0, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

// ===============================
// Helper Function to Build Doubly Linked List from Array
// ===============================
function buildDoublyList(arr) {
  if (arr.length === 0) return null;

  const head = new DoublyListNode(arr[0]);
  let curr = head;

  for (let i = 1; i < arr.length; i++) {
    const node = new DoublyListNode(arr[i]);
    curr.next = node;
    node.prev = curr;
    curr = node;
  }

  return head;
}

// ===============================
// Helper Function: Traverse Forward
// ===============================
function toArrayForward(head) {
  const res = [];
  let curr = head;

  while (curr) {
    res.push(curr.data);
    curr = curr.next;
  }

  return res;
}

// ===============================
// Helper Function: Traverse Backward
// ===============================
function toArrayBackward(head) {
  const res = [];
  if (!head) return res;

  // Move to the tail of the list
  let curr = head;
  while (curr.next) {
    curr = curr.next;  // Move to the last node
  }

  // Traverse backward using prev pointers
  while (curr) {
    res.push(curr.data);
    curr = curr.prev;
  }

  return res;
}


// ===============================
// Solution: Reverse a Doubly Linked List
// ===============================
class Solution {
  reverseDoublyLinkedList(head) {
    // TODO 0: If the list is empty or has only one node, return head
    if(!head || !head.next) return head;

    // TODO 1: Initialize a pointer current to head
    let curr = head;
    // TODO 2: While current is not null:
    //         - Temporarily store current.prev
    //         - Swap current.prev and current.next
    //         - Move current to the next node to process
    //           (this will be the old prev after swapping)
    while(curr !== null) {
      let temp = curr.prev;
      curr.prev = curr.next;
      curr.next = temp;

      if(curr.prev === null) break;

      curr = curr.prev;
    }
    // TODO 3: After traversal, update head to the last processed node
    head = curr;
    // TODO 4: Return the new head
    return head;
  }
}

// ===============================
// Tests
// ===============================
const sol = new Solution();

// Case 1: Empty list
let head1 = buildDoublyList([]);
head1 = sol.reverseDoublyLinkedList(head1);
console.log("Case 1 forward:", toArrayForward(head1));   // expected: []
console.log("Case 1 backward:", toArrayBackward(head1)); // expected: []

// Case 2: Single node
let head2 = buildDoublyList([1]);
head2 = sol.reverseDoublyLinkedList(head2);
console.log("Case 2 forward:", toArrayForward(head2));   // expected: [1]
console.log("Case 2 backward:", toArrayBackward(head2)); // expected: [1]

// Case 3: Multiple nodes
let head3 = buildDoublyList([1, 2, 3, 4]);
head3 = sol.reverseDoublyLinkedList(head3);
console.log("Case 3 forward:", toArrayForward(head3));   // expected: [4,3,2,1]
console.log("Case 3 backward:", toArrayBackward(head3)); // expected: [1,2,3,4]
