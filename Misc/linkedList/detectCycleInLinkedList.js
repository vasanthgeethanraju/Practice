// LeetCode #141 ✔️
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
// arr = [1,2,3,4,5], pos = 2
// means last node points back to index 2 (0-based)
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
// Problem: Detect Cycle in Linked List
// Return true if cycle exists, else false
// ===============================
function hasCycle(head) {
  // TODO 1: Create slow = head
  // TODO 2: Create fast = head

  // TODO 3: While fast is not null AND fast.next is not null:
  //   - move slow 1 step
  //   - move fast 2 steps
  //   - if slow === fast, return true

  // TODO 4: Return false (fast reached null)

  let slow = head,
      fast = head;

  while(fast !== null && fast.next !==null) {
    slow = slow.next;
    fast = fast.next.next;

    if(slow === fast) return true;
  }

  return false;
}

// LeetCode #141 ✔️
// ===============================
// Tests
// ===============================

// No cycle
const head1 = buildList([1, 2, 3, 4]);
console.log("Cycle?", hasCycle(head1)); // expected: false

// Cycle exists: tail points back to index 1 (value 2)
const head2 = buildListWithCycle([1, 2, 3, 4, 5], 1);
console.log("Cycle?", hasCycle(head2)); // expected: true

// Cycle exists: tail points back to index 0 (value 1)
const head3 = buildListWithCycle([7, 8, 9], 0);
console.log("Cycle?", hasCycle(head3)); // expected: true

// Empty list
const head4 = buildList([]);
console.log("Cycle?", hasCycle(head4)); // expected: false
