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
// Input: [10, 20, 30]
// Output: 10 -> 20 -> 30 -> null
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
// Input: 10 -> 20 -> 30 -> null
// Output: [10, 20, 30]
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
// Problem: Count Nodes in Linked List
// ===============================
function countNodes(head) {
  // TODO 1: Create a variable count = 0
  let count = 0,
      curr  = head;
  // TODO 2: Create a pointer curr = head

  // TODO 3: While curr is not null:
  //   - increment count
  //   - move curr to curr.next

  while(curr !== null) {
    count++;
    curr = curr.next;
  }
  // TODO 4: return count
  return count;
}

// ===============================
// Tests
// ===============================
const head1 = buildList([5, 6, 7, 8]);
console.log("List:", toArray(head1));       // expected: [5, 6, 7, 8]
console.log("Count:", countNodes(head1));   // expected: 4

const head2 = buildList([]);
console.log("List:", toArray(head2));       // expected: []
console.log("Count:", countNodes(head2));   // expected: 0

const head3 = buildList([99]);
console.log("List:", toArray(head3));       // expected: [99]
console.log("Count:", countNodes(head3));   // expected: 1
