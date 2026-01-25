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
// Problem: Remove Nth Node From End
// Return the updated head.
// ===============================
function removeNthFromEnd(head, n) {
  // TODO 1: Create a dummy node pointing to head
  
  // TODO 2: Create slow = dummy and fast = dummy

  // TODO 3: Move fast forward by n steps
  // for (let i = 0; i < n; i++) fast = fast.next;

  // TODO 4: Move slow and fast together until fast.next is null
  // while (fast.next !== null) {
  //   slow = slow.next;
  //   fast = fast.next;
  // }

  // TODO 5: Delete the node after slow
  // slow.next = slow.next.next;

  // TODO 6: Return dummy.next
  const dummy = new ListNode(0, head);
  let slow = dummy, fast = dummy;

  for(let i=0; i<n; i++){
    if (fast.next === null) return head;
    fast = fast.next;
  }

  while(fast.next !==null) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;

  return dummy.next;
 }

// ===============================
// Tests
// ===============================

// Example 1
const head1 = buildList([1, 2, 3, 4, 5]);
console.log("Before:", toArray(head1)); // expected: [1, 2, 3, 4, 5]
const newHead1 = removeNthFromEnd(head1, 2);
console.log("After :", toArray(newHead1)); // expected: [1, 2, 3, 5]

// Example 2 (remove head)
const head2 = buildList([10, 20, 30]);
console.log("Before:", toArray(head2)); // expected: [10, 20, 30]
const newHead2 = removeNthFromEnd(head2, 3);
console.log("After :", toArray(newHead2)); // expected: [20, 30]

// Example 3 (remove last node)
const head3 = buildList([7, 8, 9]);
console.log("Before:", toArray(head3)); // expected: [7, 8, 9]
const newHead3 = removeNthFromEnd(head3, 4);
console.log("After :", toArray(newHead3)); // expected: [7, 8]

// Example 4 (single node list)
const head4 = buildList([99]);
console.log("Before:", toArray(head4)); // expected: [99]
const newHead4 = removeNthFromEnd(head4, 1);
console.log("After :", toArray(newHead4)); // expected: []
