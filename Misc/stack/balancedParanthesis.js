function isBalanced(s) {
  const stack = [];

  for (let ch of s) {
    if (ch === "(") {
      // TODO: push
      stack.push(ch);
    } else {
      // ch === ")"
      // TODO: if stack empty return false
      if(!stack.length) return false;
      // TODO: pop one "("
      stack.pop();
    }
  }

  // TODO: if stack empty => true else false
  if(!stack.length) return true;
  return false;
}

// tests
console.log(isBalanced("(()())")); // true
console.log(isBalanced("(()"));    // false
console.log(isBalanced(")("));     // false