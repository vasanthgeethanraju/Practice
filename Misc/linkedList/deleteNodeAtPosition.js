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

function deleteNode(head, position) {
  let dummy = new ListNode(0, head),
      prev  = dummy,
      curr  = head;

  for(let i =0; i< position; i++) {
    prev = curr;
    curr = curr.next;

    if(curr === null) {
      return head;
    }
  }

  prev.next = curr.next;

  return dummy.next;
}

// ===============================
// Example Cases (deleting by position)
// ===============================

// Case 1: Delete node at position 1 (value 20)
const head1 = buildList([10, 20, 30]);
console.log("Before:", toArray(head1));  // expected: [10, 20, 30]
const newHead1 = deleteNode(head1, 1);   // delete node at position 1
console.log("After :", toArray(newHead1));  // expected: [10, 30]

// Case 2: Delete head node (position 0)
const head2 = buildList([10, 20, 30]);
console.log("Before:", toArray(head2));  // expected: [10, 20, 30]
const newHead2 = deleteNode(head2, 0);   // delete node at position 0 (head)
console.log("After :", toArray(newHead2));  // expected: [20, 30]

// Case 3: Delete tail node (position 2)
const head3 = buildList([10, 20, 30]);
console.log("Before:", toArray(head3));  // expected: [10, 20, 30]
const newHead3 = deleteNode(head3, 2);   // delete node at position 2 (tail)
console.log("After :", toArray(newHead3));  // expected: [10, 20]

// Case 4: Delete non-existent position (position 5, which is out of bounds)
const head4 = buildList([10, 20, 30]);
console.log("Before:", toArray(head4));  // expected: [10, 20, 30]
const newHead4 = deleteNode(head4, 5);   // position 5 doesn't exist
console.log("After :", toArray(newHead4));  // expected: [10, 20, 30]