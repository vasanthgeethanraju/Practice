class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
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

class Solution {
  printReverse(head) {
    if (head === null) return;
    this.printReverse(head.next);
    console.log(head.val);
  }
}

// Test
const sol = new Solution();
const head = buildList([1, 2, 3, 4]);
sol.printReverse(head);
// Output:
// 4
// 3
// 2
// 1
