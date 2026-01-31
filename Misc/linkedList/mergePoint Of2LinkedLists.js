// ===============================
// Linked List Node Definition
// ===============================
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// ===============================
// Helper Function to Build Linked List from Array
// ===============================
function buildList(arr) {
  let dummy = new ListNode(0);
  let tail = dummy;
  for (let val of arr) {
    tail.next = new ListNode(val);
    tail = tail.next;
  }
  return dummy.next;
}

// ===============================
// Helper Function to Merge Lists at a Specific Node
// ===============================
function mergeListsAt(headA, headB, mergeValue) {
  // Find tail of B (we will connect B's tail into A)
  let tailB = headB;
  while (tailB && tailB.next) {
    tailB = tailB.next;
  }

  // Find merge node in A (where mergeValue is found)
  let mergeNode = headA;
  while (mergeNode && mergeNode.val !== mergeValue) {
    mergeNode = mergeNode.next;
  }

  // Connect B's tail to merge node in A
  if (tailB && mergeNode) {
    tailB.next = mergeNode;
  }
}

// ===============================
// Solution to Find Merge Point
// ===============================
class Solution {
  findMergePoint(headA, headB) {
    let ptr1 = headA, ptr2 = headB;

    // Traverse both lists. When a pointer reaches the end of one list,
    // it starts at the beginning of the other list.
    // If they meet, return the merge node (or null if no merge)
    while(ptr1 !== ptr2) {
      ptr1 = (ptr1 === null) ? headB : ptr1.next;
      ptr2 = (ptr2 === null) ? headA : ptr2.next;
    }

    return ptr1 ? ptr1.val : null; // Return the merged node's value, or null if no merge
  }
}

// ===============================
// Tests
// ===============================

const solution = new Solution();

// Example 1: Lists Merge at Node with Value 3
let headA1 = buildList([1, 2, 3, 4, 5]);
let headB1 = buildList([6, 7]);

mergeListsAt(headA1, headB1, 3); // Merging List B starting at value 3 in List A

console.log("Example 1: Merge Point ->", solution.findMergePoint(headA1, headB1)); // Expected Output: 3

// Example 2: Lists Do Not Merge
let headA2 = buildList([1, 2, 3]);
let headB2 = buildList([4, 5]);

console.log("Example 2: Merge Point ->", solution.findMergePoint(headA2, headB2)); // Expected Output: null
