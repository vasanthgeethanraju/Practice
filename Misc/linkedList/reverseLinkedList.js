class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper: build linked list from array
function buildList(arr) {
  let dummy = new ListNode(0);
  let tail = dummy;

  for (let val of arr) {
    tail.next = new ListNode(val);
    tail = tail.next;
  }

  return dummy.next;
}

// Helper: convert linked list to array (for printing output)
function listToArray(head) {
  const res = [];
  let curr = head;

  while (curr) {
    res.push(curr.val);
    curr = curr.next;
  }

  return res;
}

function reverseList(head) {
  // TODO 1: Initialize a previous pointer as null
  let prev = null,
  // TODO 2: Initialize a current pointer as head
      curr = head;
  // TODO 3: While current exists:
  //   - Save next node
  //   - Reverse current.next pointer to previous
  //   - Move previous forward
  //   - Move current forward
  while(curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // TODO 4: Return previous pointer (new head)
  return prev;
}

// Input
const head = buildList([1, 2, 3, 4]);

// Call
const reversedHead = reverseList(head);

// Output
console.log(listToArray(reversedHead)); 
// Expected Output: [4, 3, 2, 1]
