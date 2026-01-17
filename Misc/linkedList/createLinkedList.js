// Define the ListNode class
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Function to print the linked list
function printList(head) {
  let curr   = head,
      result = '';
  
  while (curr !== null) {
    result += curr.val;
    if (curr.next !== null) {
      result += ' -> ';
    }
    curr = curr.next;
  }
  
  console.log(result);
}

// Sample input: creating a linked list 1 -> 2 -> 3 -> null
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

// Call the function to print the linked list
printList(head);
