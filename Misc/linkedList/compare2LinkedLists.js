/**
 * Compare two linked lists to check if they are identical
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
  compareLists(head1, head2) {
    // TODO 0: Start pointers at the heads of both lists
    let ptr1 = head1, ptr2 = head2;

    // TODO 1: While both pointers are not null
    //         - compare the values at the current nodes
    //         - if they differ, return false
    //         - move both pointers forward
    while(ptr1 !== null && ptr2 !== null) {
      if(ptr1.val !== ptr2.val) return false;
     
      ptr1 = ptr1.next;
      ptr2 = ptr2.next;
    }

    // TODO 2: After the loop, check if both lists ended at the same time
    //         - if yes, return true
    //         - otherwise, return false
    if(ptr1 === null && ptr2 === null) return true;

    return false;
  }
}


/* -------------------- Tests -------------------- */
const sol = new Solution();

// Example Case 1: Identical lists
let head1 = buildList([1, 2, 3, 4]);
let head2 = buildList([1, 2, 3, 4]);
console.log(sol.compareLists(head1, head2)); // true

// Example Case 2: Different lists
let head3 = buildList([1, 2, 3, 4]);
let head4 = buildList([1, 2, 3, 5]);
console.log(sol.compareLists(head3, head4)); // false

// Example Case 3: Lists with different lengths
let head5 = buildList([1, 2, 3]);
let head6 = buildList([1, 2, 3, 4]);
console.log(sol.compareLists(head5, head6)); // false

// Example Case 4: One list is empty
let head7 = buildList([1, 2, 3]);
let head8 = null;
console.log(sol.compareLists(head7, head8)); // false

// Example Case 5: Both lists are empty
let head9 = null;
let head10 = null;
console.log(sol.compareLists(head9, head10)); // true
