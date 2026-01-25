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
// Problem: Contains Value in Linked List
// ===============================
function contains(head, target) {
  // TODO 1: Create a pointer curr = head
  let curr = head;

  // TODO 2: While curr is not null:
  //   - if curr.val === target, return true
  //   - move curr = curr.next

  while(curr !== null) {
    if(curr.val === target) return true;
    curr = curr.next;
  }
  // TODO 3: If you finish the loop, return false
  return false;
}

// ===============================
// Tests
// ===============================
const head1 = buildList([4, 9, 2]);
console.log("List:", toArray(head1));            // expected: [4, 9, 2]

console.log(contains(head1, 9));                 // expected: true
console.log(contains(head1, 7));                 // expected: false

const head2 = buildList([]);
console.log("List:", toArray(head2));            // expected: []
console.log(contains(head2, 1));                 // expected: false

const head3 = buildList([99]);
console.log("List:", toArray(head3));            // expected: [99]
console.log(contains(head3, 99));                // expected: true
console.log(contains(head3, 100));               // expected: false
