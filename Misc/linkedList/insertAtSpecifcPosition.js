
/**
 * Insert a node at a specific position in a linked list
 * 0-based indexing
 */

/* -------------------- ListNode -------------------- */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/* -------------------- Helpers -------------------- */
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

/* -------------------- Solution -------------------- */
class Solution {
  insertAtPosition(head, value, position) {
    // TODO 0: create new node
    const newNode = new ListNode(value);

    // TODO 1: if position == 0, insert at head
    if (position === 0) {
      newNode.next = head;
      return newNode;
    }

    // TODO 2: traverse to node BEFORE target position
    // use a counter starting at 0
    // stop at position - 1
    let curr = head, index = 0;

    while(curr !==null && index < position - 1) {
      curr = curr.next;
      index++;
    }

    // TODO 3: if position is out of bounds, return original head
    if(curr ===  null) return head;
    // TODO 4: rewire pointers
    newNode.next = curr.next
    curr.next = newNode
    
    // TODO 5: return head
    return head;
  }
}

/* -------------------- Tests -------------------- */
const sol = new Solution();

// Insert in middle
let head1 = buildList([1, 2, 3, 4]);
head1 = sol.insertAtPosition(head1, 9, 2);
console.log(toArray(head1)); // [1, 2, 9, 3, 4]

// Insert at head
let head2 = buildList([1, 2, 3]);
head2 = sol.insertAtPosition(head2, 5, 0);
console.log(toArray(head2)); // [5, 1, 2, 3]

// Insert at tail
let head3 = buildList([1, 2, 3]);
head3 = sol.insertAtPosition(head3, 7, 3);
console.log(toArray(head3)); // [1, 2, 3, 7]

// Position out of bounds
let head4 = buildList([1, 2]);
head4 = sol.insertAtPosition(head4, 9, 10);
console.log(toArray(head4)); // [1, 2]