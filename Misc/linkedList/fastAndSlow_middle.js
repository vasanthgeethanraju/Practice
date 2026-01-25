// LeetCode #876 ✔️
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
// Problem: Middle of Linked List
// Return the middle node.
// If even length, return the 2nd middle.
// ===============================
function middleNode(head) {
  // TODO 1: Create slow = head
  // TODO 2: Create fast = head

  // TODO 3: While fast is not null AND fast.next is not null:
  //   - move slow 1 step
  //   - move fast 2 steps

  // TODO 4: Return slow

  let slow = head,
      fast = head;

  while(fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}


// LeetCode #876 ✔️
// ===============================
// Tests
// ===============================

// Odd length
const head1 = buildList([1, 2, 3, 4, 5]);
console.log("List:", toArray(head1));                 // expected: [1, 2, 3, 4, 5]
console.log("Middle:", middleNode(head1).val);        // expected: 3

// Even length (should return 2nd middle)
const head2 = buildList([1, 2, 3, 4, 5, 6]);
console.log("List:", toArray(head2));                 // expected: [1, 2, 3, 4, 5, 6]
console.log("Middle:", middleNode(head2).val);        // expected: 4

// Single node
const head3 = buildList([3, 4, 5, 6, 7]);
console.log("List:", toArray(head3));                 // expected: [99]
console.log("Middle:", middleNode(head3).val);        // expected: 99
