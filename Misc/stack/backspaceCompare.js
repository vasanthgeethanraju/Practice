function backspaceCompare(s, t) {
  // TODO 1: Create a helper function build(str)
  //    - It should return the final processed string after applying backspaces
  //
  // TODO 2: Inside build(str):
  //    - Initialize stack = []
  //    - Loop through each char in str:
  //        - If char is '#':
  //            - Pop from stack (if stack is not empty)
  //        - Else:
  //            - Push char into stack
  //    - Return stack.join("")

  function build(str) {
    let stack = [];
  
    for(const ch of str) {
      if(stack.length > 0 && ch === "#") {
        stack.pop()
      } else {
        stack.push(ch);
      }
    }
    return stack.join("");
  }

  //
  // TODO 3: Return build(s) === build(t)
  return build(s) === build(t);
}

const s = "ab#c";
const t = "ad#c";
console.log(backspaceCompare(s, t)); // true
