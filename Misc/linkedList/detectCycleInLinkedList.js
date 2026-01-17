class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper: build linked list and optionally create a cycle
// pos = index where tail connects back (0-based). pos = -1 means no cycle.
function buildListWithCycle(arr, pos) {
  if (arr.length === 0) return null;

  const nodes = arr.map(v => new ListNode(v));

  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  if (pos !== -1) {
    nodes[nodes.length - 1].next = nodes[pos];
  }

  return nodes[0];
}

function hasCycle(head) {
  // TODO 1: Initialize slow pointer at head
  let slow = head,
  // TODO 2: Initialize fast pointer at head
      fast = head;
  // TODO 3: While fast exists AND fast.next exists:
  //   - Move slow by 1 step
  //   - Move fast by 2 steps
  //   - If slow and fast meet, return true
  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  // TODO 4: If loop ends, return false
  return false;
}

// Input (cycle exists: tail connects to index 1)
const head2 = buildListWithCycle([3, 2, 0, -4], 1);

// Call + Output
console.log(hasCycle(head2));
// Expected Output: true
