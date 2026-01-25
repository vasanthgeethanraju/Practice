class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function buildList(arr) {
  let dummy = new ListNode(0);
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

  while (curr !== null) {
    res.push(curr.val);
    curr = curr.next;
  }

  return res;
}

const head1 = buildList([1, 2, 3]);
console.log("List 1:", toArray(head1)); // expected: [1, 2, 3]

const head2 = buildList([]);
console.log("List 2:", toArray(head2)); // expected: []

const head3 = buildList([99]);
console.log("List 3:", toArray(head3)); // expected: [99]