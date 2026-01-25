// LeetCode #206 ✔️
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
// Problem: Reverse Linked List
// Input:  10 -> 20 -> 30 -> null
// Output: 30 -> 20 -> 10 -> null
// ===============================
function reverseList(head) {
  // TODO 1: Create prev = null

  // TODO 2: Create curr = head

  // TODO 3: While curr is not null:
  //   - store nextNode = curr.next
  //   - reverse pointer: curr.next = prev
  //   - move prev forward: prev = curr
  //   - move curr forward: curr = nextNode

  // TODO 4: Return prev (new head)

  let prev = null,
      curr = head;

  while(curr !== null) {
    const nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
    // [curr.next, prev, curr] = [prev, curr, curr.next];
  }

  return prev;
}

// LeetCode #206 ✔️
// ===============================
// Tests
// ===============================
const head1 = buildList([10, 20, 30]);
console.log("Before:", toArray(head1));                 // expected: [10, 20, 30]
const reversed1 = reverseList(head1);
console.log("After :", toArray(reversed1));             // expected: [30, 20, 10]

const head2 = buildList([99]);
console.log("Before:", toArray(head2));                 // expected: [99]
const reversed2 = reverseList(head2);
console.log("After :", toArray(reversed2));             // expected: [99]

const head3 = buildList([6, 7, 8, 9, 10]);
console.log("Before:", toArray(head3));                 // expected: []
const reversed3 = reverseList(head3);
console.log("After :", toArray(reversed3));             // expected: []
