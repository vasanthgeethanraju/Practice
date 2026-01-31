// LeetCode #83 ✔️
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
// Problem: Remove Duplicates from Sorted Linked List
// Input:  1 -> 1 -> 2 -> 3 -> 3 -> null
// Output: 1 -> 2 -> 3 -> null
// ===============================
function deleteDuplicates(head) {
  // TODO 1: Create a pointer to traverse the linked list
  let current = head;

  // TODO 2: Traverse the list until the second last node
  while (current !== null && current.next !== null) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  
  return head;
}

// ===============================
// Tests
// ===============================

// Test 1
const head1 = buildList([1, 1, 2, 3, 3]);
console.log("Before:", toArray(head1));                 // expected: [1, 1, 2, 3, 3]
const result1 = deleteDuplicates(head1);
console.log("After :", toArray(result1));               // expected: [1, 2, 3]

// Test 2
const head2 = buildList([1, 1, 1, 1, 1]);
console.log("Before:", toArray(head2));                 // expected: [1, 1, 1, 1, 1]
const result2 = deleteDuplicates(head2);
console.log("After :", toArray(result2));               // expected: [1]

// Test 3
const head3 = buildList([2, 3, 3, 3, 4, 5, 5]);
console.log("Before:", toArray(head3));                 // expected: [2, 3, 3, 3, 4, 5, 5]
const result3 = deleteDuplicates(head3);
console.log("After :", toArray(result3));               // expected: [2, 3, 4, 5]

// Test 4
const head4 = buildList([7, 7, 8]);
console.log("Before:", toArray(head4));                 // expected: [7, 7, 8]
const result4 = deleteDuplicates(head4);
console.log("After :", toArray(result4));               // expected: [7, 8]
