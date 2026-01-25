// LeetCode #21 ✔️
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
// 2) Build Linked List from Array
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
// 3) Convert Linked List to Array
// ===============================
function toArray(head) {
  const res = [];
  let curr = head;

  while (curr !== null) {
    res.push(curr.val);
    curr = curr.next;
  }

  return res;
}

// ===============================
// Problem: Merge Two Sorted Lists
// ===============================
function mergeTwoLists(list1, list2) {
  // TODO 1: Create a dummy node and a tail pointer
  const dummy = new ListNode(0);
  let tail = dummy;

  // TODO 2: While list1 and list2 are both not null:
  //   - compare list1.val and list2.val
  //   - attach the smaller node to tail.next
  //   - move that list forward
  //   - move tail forward

  while(list1 !== null && list2 !==null) {
    if(list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  // TODO 3: After the loop, one list is finished
  // Attach the remaining nodes:
  // tail.next = list1 OR list2 (whichever is not null)
  tail.next = list1 !== null ? list1 : list2;

  // TODO 4: Return dummy.next
  return dummy.next;
}

// LeetCode #21 ✔️
// ===============================
// Tests
// ===============================
const l1 = buildList([1, 2, 4]);
const l2 = buildList([1, 3, 4]);

console.log("List1:", toArray(l1)); // expected: [1, 2, 4]
console.log("List2:", toArray(l2)); // expected: [1, 3, 4]

const merged = mergeTwoLists(l1, l2);
console.log("Merged:", toArray(merged)); // expected: [1, 1, 2, 3, 4, 4]

// Edge cases
const l3 = buildList([]);
const l4 = buildList([0]);

const merged2 = mergeTwoLists(l3, l4);
console.log("Merged2:", toArray(merged2)); // expected: [0]
