/**
 * Reorder List (LeetCode #143)
 * In-place. Returns head for testing convenience.
 */

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function buildList(arr) {
  const dummy = new ListNode(-1);
  let tail = dummy;
  for (const x of arr) {
    tail.next = new ListNode(x);
    tail = tail.next;
  }
  return dummy.next;
}

function toArray(head) {
  const res = [];
  let curr = head;
  while (curr) {
    res.push(curr.val);
    curr = curr.next;
  }
  return res;
}

function reorderList(head) {
  // Edge cases
  if (!head || !head.next || !head.next.next) return head;

  // 1) Find left-middle (slow) and split
  let slow = head;
  let fast = head.next; // starting fast ahead gives left-middle behavior

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let second = slow.next;
  slow.next = null; // cut

  // 2) Reverse second half
  let prev = null;
  let curr = second;

  while (curr) {
    const nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }

  second = prev; // new head of reversed second half

  // 3) Weave alternating
  let p1 = head;
  let p2 = second;

  while (p1 && p2) {
    const next1 = p1.next;
    p1.next = p2;
    p1 = next1;

    const next2 = p2.next;
    p2.next = p1;
    p2 = next2;
  }

  return head;
}

/* ----------------------------- Tests ----------------------------- */
function test(arr) {
  const head = buildList(arr);
  reorderList(head);
  return toArray(head);
}

console.log(test([1, 2, 3, 4]));       // [1,4,2,3]
console.log(test([1, 2, 3, 4, 5]));    // [1,5,2,4,3]
console.log(test([1]));               // [1]
console.log(test([1, 2]));            // [1,2]
console.log(test([1, 2, 3]));         // [1,3,2]
