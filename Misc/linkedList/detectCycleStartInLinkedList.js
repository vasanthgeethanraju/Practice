// LeetCode #142 ✔️
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
// Helper: Build Linked List from Array
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
// Helper: Build List With Cycle
// arr = [1,2,3,4,5], pos = 2 (0-based)
// tail points to index 2 => value 3
// cycle: 1 -> 2 -> 3 -> 4 -> 5 -> 3 ...
// If pos = -1 => no cycle
// ===============================
function buildListWithCycle(arr, pos) {
  if (arr.length === 0) return null;

  let dummy = new ListNode(0);
  let tail = dummy;

  let cycleNode = null;
  let index = 0;

  for (const x of arr) {
    tail.next = new ListNode(x);
    tail = tail.next;

    if (index === pos) {
      cycleNode = tail;
    }

    index++;
  }

  if (pos !== -1) {
    tail.next = cycleNode;
  }

  return dummy.next;
}

// ===============================
// Problem: Find Cycle Start Node
// Return the node where the cycle begins, or null if no cycle.
// ===============================
function detectCycleStart(head) {
  // TODO 1: Create slow = head, fast = head

  // TODO 2: While fast != null AND fast.next != null:
  //   - move slow 1 step
  //   - move fast 2 steps
  //   - if slow === fast, a cycle exists:
  //       TODO 3: Create ptr1 = head, ptr2 = slow
  //       TODO 4: While ptr1 !== ptr2:
  //         - move ptr1 1 step
  //         - move ptr2 1 step
  //       TODO 5: Return ptr1 (or ptr2) - this is the cycle start

  // TODO 6: If loop finishes, return null (no cycle)

  let slow = head, fast = head;

  while(fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if(slow === fast) {
      let ptr1 = head, ptr2 = slow;

      while(ptr1 !== ptr2) {
        ptr1 = ptr1.next;
        ptr2 = ptr2.next;
      }

      return ptr1;
    }
  }
  return null;
}

// LeetCode #142 ✔️
// ===============================
// Tests
// ===============================

// No cycle
const head1 = buildList([1, 2, 3, 4]);
const start1 = detectCycleStart(head1);
console.log("Cycle start:", start1 ? start1.val : null); // expected: null

// Cycle begins at index 2 (value 3)
const head2 = buildListWithCycle([1, 2, 3, 4, 5], 1);
const start2 = detectCycleStart(head2);
console.log("Cycle start:", start2 ? start2.val : null); // expected: 3

// Cycle begins at index 0 (value 7)
const head3 = buildListWithCycle([7, 8, 9], 0);
const start3 = detectCycleStart(head3);
console.log("Cycle start:", start3 ? start3.val : null); // expected: 7

// Single node cycle begins at index 0 (value 42)
const head4 = buildListWithCycle([42], 0);
const start4 = detectCycleStart(head4);
console.log("Cycle start:", start4 ? start4.val : null); // expected: 42
