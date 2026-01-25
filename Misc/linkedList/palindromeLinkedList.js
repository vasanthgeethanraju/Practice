/**
 * Palindrome Linked List (LeetCode #234)
 * Goal: return true if the linked list values read the same forward and backward.
 *
 * Style: concept -> example -> TODO skeleton
 * Time: O(n)
 * Space: O(1) extra (we reverse in-place)
 */

/* ----------------------------- Helpers ----------------------------- */

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function buildList(arr) {
  // Builds a singly linked list from an array and returns head
  const dummy = new ListNode(-1);
  let tail = dummy;

  for (const x of arr) {
    tail.next = new ListNode(x);
    tail = tail.next;
  }

  return dummy.next;
}

function toArray(head) {
  // Converts linked list to array (useful for debugging)
  const res = [];
  let curr = head;

  while (curr) {
    res.push(curr.val);
    curr = curr.next;
  }

  return res;
}

function printList(head, label = "list") {
  console.log(label + ":", toArray(head).join(" -> "));
}

/* ------------------------ Problem: isPalindrome ------------------------ */

function isPalindrome(head) {
  // TODO 0: Edge cases
  // If head is null or only one node, it's a palindrome
  if (!head || !head.next) return true;

  // TODO 1: Find the middle using slow/fast pointers
  // slow moves 1 step, fast moves 2 steps
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
  }

  // Optional (alternate style):
  // If you want to skip the middle for odd length lists, you can do:
  // if (fast) slow = slow.next;
  // TODO: Decide if you want to use this or not (either is fine)

  // TODO 2: Reverse the second half starting from slow
  // Use prev/curr/nextNode pattern
  let prev = null;
  let curr = slow;

  while (curr) {
    // TODO:
    const nextNode = curr.next
    curr.next = prev
    prev = curr
    curr = nextNode
  }

  // After reversing:
  // prev is the head of the reversed second half
  let left = head;
  let right = prev;

  // TODO 3: Compare the two halves
  // Compare while right is not null (right half is <= left half length)
  while (right) {
    // TODO:
    if (left.val !== right.val) return false
    left = left.next
    right = right.next
  }

  // Optional (nice-to-have):
  // TODO 4: Restore the list by reversing the second half again (not required by LeetCode)
  // This is useful if interviewer asks you to keep input unchanged.
  let reversedSecondHalf = null;
  let temp = prev;
  while (temp) {
    const nextNode = temp.next;
    temp.next = reversedSecondHalf;
    reversedSecondHalf = temp;
    temp = nextNode;
  }

  // Now we can reconnect the reversed second half back to the original list
  slow.next = reversedSecondHalf;

  return true;
}

/* ----------------------------- Tests ----------------------------- */

// Even length palindrome
const head1 = buildList([1, 2, 2, 1]);
console.log(isPalindrome(head1)); // true

// Odd length palindrome
const head2 = buildList([1, 2, 3, 2, 1]);
console.log(isPalindrome(head2)); // true

// Not palindrome
const head3 = buildList([1, 2]);
console.log(isPalindrome(head3)); // false

// Single node
const head4 = buildList([7]);
console.log(isPalindrome(head4)); // true

// Empty list
const head5 = buildList([]);
console.log(isPalindrome(head5)); // true
