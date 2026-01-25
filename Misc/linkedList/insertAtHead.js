// ===============================
// 1) Linked List Node Definition
// ===============================
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// ===============================
// 2) Build Linked List from Array
// ===============================
function buildList(arr) {
  let dummy = new ListNode(0);
  let tail = dummy;

  for (const x of arr) {
    tail.next = new ListNode(x);
    tail = tail.next;
  }

  return dummy.next;
}

// ===============================
// 3) Convert Linked List to Array
// ===============================
function toArray(head) {
  const res = [];
  let curr = head;

  while (curr !== null) {
    res.push(curr.val);
    curr = curr.next;
  }

  return res;
}

// ===============================
// Problem: Insert at Head
// ===============================
function insertAtHead(head, val) {
  // TODO 1: Create a new node with value = val
  let node = new ListNode(val);
  // TODO 2: Point the new node's next to the current head
  node.next = head;
  // TODO 3: Return the new node (this becomes the new head)
  return node;
}

// ===============================
// Tests
// ===============================
const head1 = buildList([10, 20, 30]);
console.log("Before:", toArray(head1)); // expected: [10, 20, 30]

const newHead1 = insertAtHead(head1, 5);
console.log("After :", toArray(newHead1)); // expected: [5, 10, 20, 30]

// Insert into empty list
const head2 = buildList([]);
console.log("Before:", toArray(head2)); // expected: []

const newHead2 = insertAtHead(head2, 99);
console.log("After :", toArray(newHead2)); // expected: [99]
