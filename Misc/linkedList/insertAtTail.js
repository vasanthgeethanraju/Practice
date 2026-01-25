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
// Problem: Insert at Tail
// ===============================
function insertAtTail(head, val) {
  // TODO 1: Create a new node with value = val
  let node = new ListNode(val);
  // TODO 2: If head is null (empty list), return the new node
  if(head === null) return node;
  // TODO 3: Create a pointer curr = head
  let curr = head;
  // TODO 4: While curr.next is not null:
  //   - move curr = curr.next
  while(curr.next !== null) {
    curr = curr.next;
  }
  // TODO 5: Now curr is at the last node
  //   - set curr.next = new node

  curr.next = node;
  // TODO 6: Return head
  return head;
}

// ===============================
// Tests
// ===============================
const head1 = buildList([10, 20, 30]);
console.log("Before:", toArray(head1)); // expected: [10, 20, 30]

const newHead1 = insertAtTail(head1, 40);
console.log("After :", toArray(newHead1)); // expected: [10, 20, 30, 40]

// Insert into empty list
const head2 = buildList([]);
console.log("Before:", toArray(head2)); // expected: []

const newHead2 = insertAtTail(head2, 99);
console.log("After :", toArray(newHead2)); // expected: [99]
