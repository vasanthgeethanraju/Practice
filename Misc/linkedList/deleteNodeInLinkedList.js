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
// Problem: Delete First Occurrence of target
// Example:
//   Input:  [10, 20, 30], target = 20
//   Output: [10, 30]
// ===============================
function deleteValue(head, target) {
  // TODO 1: Create a dummy node pointing to head
  let dummy = new ListNode(0, head);

  // TODO 2: Create prev = dummy and curr = head
  let prev = dummy,
      curr = head;
  // TODO 3: While curr is not null:
  //   - if curr.val === target:
  //       prev.next = curr.next   (this removes curr)
  //       break
  //   - else:
  //       move prev forward
  //       move curr forward

  while(curr !== null) {
    if(curr.val === target) {
      prev.next = curr.next;
      break;
    }
    prev = prev.next;
    curr = curr.next;
  }

  // TODO 4: Return dummy.next (new head)
  return dummy.next;
}

// ===============================
// Tests
// ===============================

// Delete middle
const head1 = buildList([10, 20, 30]);
console.log("Before:", toArray(head1));                 // expected: [10, 20, 30]
const newHead1 = deleteValue(head1, 20);
console.log("After :", toArray(newHead1));              // expected: [10, 30]

// Delete head
const head2 = buildList([10, 20, 30]);
console.log("Before:", toArray(head2));                 // expected: [10, 20, 30]
const newHead2 = deleteValue(head2, 10);
console.log("After :", toArray(newHead2));              // expected: [20, 30]

// Delete tail
const head3 = buildList([10, 20, 30]);
console.log("Before:", toArray(head3));                 // expected: [10, 20, 30]
const newHead3 = deleteValue(head3, 30);
console.log("After :", toArray(newHead3));              // expected: [10, 20]

// Target not found (list should stay same)
const head4 = buildList([10, 20, 30]);
console.log("Before:", toArray(head4));                 // expected: [10, 20, 30]
const newHead4 = deleteValue(head4, 999);
console.log("After :", toArray(newHead4));              // expected: [10, 20, 30]

// Empty list
const head5 = buildList([]);
console.log("Before:", toArray(head5));                 // expected: []
const newHead5 = deleteValue(head5, 1);
console.log("After :", toArray(newHead5));              // expected: []
