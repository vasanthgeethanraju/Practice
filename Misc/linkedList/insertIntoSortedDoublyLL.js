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
// Helper Function to Build Doubly Linked List from Array (sorted input assumed)
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
// Helper Function to Convert Doubly Linked List to Array (forward)
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
// Helper Function to Convert Doubly Linked List to Array (backward)
// (useful to verify prev pointers are correct)
// ===============================
function toArrayBackward(head) {
  const res = [];
  if (!head) return res;

  // go to tail
  let tail = head;
  while (tail.next) tail = tail.next;

  // walk backward
  let curr = tail;
  while (curr) {
    res.push(curr.data);
    curr = curr.prev;
  }
  return res;
}

// ===============================
// Solution: Insert into Sorted Doubly Linked List
// ===============================
class Solution {
  sortedInsert(head, data) {
    // TODO 0: Create a new node with the given data
    let newNode = new DoublyListNode(data);

    // TODO 1: If the list is empty, return the new node as head
    if(!head || !head.next) return newNode;
    // TODO 2: If data should be inserted before the current head:
    //         - make new node the head
    //         - connect new head with old head using both next/prev pointers
    //         - return the new head

    if(data < head.data) {
      newNode.next = head;
      head.prev = newNode;
      return newNode;
    }
    // TODO 3: Otherwise, traverse the list to find the insertion point:
    //         - move forward while the next node exists AND next node's value is still < data
    //         - after traversal, current node is the node AFTER which we insert

    let curr = head;

    while(curr && curr.next && curr.next.data < data) {
      curr = curr.next;
    }

    
    // TODO 4: Handle inserting in the middle (when current has a next node):
    //         - set the four pointers to connect: current <-> newNode <-> current.next
    newNode.next = curr.next;
    if(curr.next) {
      curr.next.prev = newNode;
    }

    // TODO 5: Handle inserting at the tail (when current.next is null):
    //         - connect current <-> newNode at the end
    curr.next = newNode;
    newNode.prev = curr;
    // TODO 6: Return the original head

    return head;
  }
}

// ===============================
// Tests
// ===============================
const sol = new Solution();

// Case 1: Insert into empty list
let head1 = buildDoublyList([]);
head1 = sol.sortedInsert(head1, 10);
console.log("Case 1: 10 inserted into empty list: []", toArrayForward(head1));   // expected: [10]
// console.log("Case 1 backward:", toArrayBackward(head1)); // expected: [10]

// Case 2: Insert at head
let head2 = buildDoublyList([2, 4, 6]);
head2 = sol.sortedInsert(head2, 1);
console.log("Case 2: 1 inserted at the head:", toArrayForward(head2));   // expected: [1,2,4,6]
// console.log("Case 2 backward:", toArrayBackward(head2)); // expected: [6,4,2,1]

// Case 3: Insert in the middle
let head3 = buildDoublyList([1, 3, 4, 10]);
head3 = sol.sortedInsert(head3, 5);
console.log("Case 3: 3 insderted in the middle:", toArrayForward(head3));   // expected: [1,3,4,5,10]
// console.log("Case 3 backward:", toArrayBackward(head3)); // expected: [10,5,4,3,1]

// Case 4: Insert at tail
let head4 = buildDoublyList([1, 2, 3]);
head4 = sol.sortedInsert(head4, 10);
console.log("Case 4: 10 inserted at tail:", toArrayForward(head4));   // expected: [1,2,3,10]
// console.log("Case 4 backward:", toArrayBackward(head4)); // expected: [10,3,2,1]

// Case 5: Insert duplicate value (decide policy: typically insert before first bigger-or-equal)
let head5 = buildDoublyList([1, 2, 2, 4]);
head5 = sol.sortedInsert(head5, 2);
console.log("Case 5: 2 inserted at position (dups):", toArrayForward(head5));   // expected: [1,2,2,2,4] (one of the valid sorted placements)
// console.log("Case 5 backward:", toArrayBackward(head5)); // expected: [4,2,2,2,1]
