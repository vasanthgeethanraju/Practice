/**
 * Merge K Sorted Lists (LeetCode #23) - Divide and Conquer - Recursion
 */

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
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

function toArray(head) {
  const res = [];
  let curr = head;
  while (curr) {
    res.push(curr.val);
    curr = curr.next;
  }
  return res;
}

// Given (you already know this)
function mergeTwoLists(list1, list2) {
  let dummy = new ListNode(0);
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  tail.next = list1 !== null ? list1 : list2;
  return dummy.next;
}

// TODO: Merge K Lists using Divide & Conquer
function mergeKLists(lists) {
  // TODO 0: handle edge cases
  // if lists is empty, return null
  if(lists.length === 0) return null;
  
  // TODO 1: while we have more than 1 list
  while(lists.length > 1) {
    // create a new array merged = []
    const merged = [];
    // merge pairs: (0,1), (2,3), ...
    for(let i =0; i<lists.length; i+=2) {
      const l1 = lists[i],
            l2 = (i + 1 < lists.length) ? lists[i + 1] : null;

      merged.push(mergeTwoLists(l1, l2));
    }
    // TODO 2: replace lists with merged
    // repeat until one list remains
    lists = merged;
  }
  // TODO 3: return the final merged list head
  return lists[0];
}

/* ----------------------------- Tests ----------------------------- */
const l1 = buildList([1, 4, 5]);
const l2 = buildList([1, 3, 4]);
const l3 = buildList([2, 6]);

const merged = mergeKLists([l1, l2, l3]);
console.log(toArray(merged)); // expected: [1,1,2,3,4,4,5,6]

console.log(toArray(mergeKLists([]))); // expected: []
console.log(toArray(mergeKLists([null, null]))); // expected: []
