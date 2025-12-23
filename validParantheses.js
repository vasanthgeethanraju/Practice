function isValid(str) {
  const stack = [],
        map = { ')': '(', '}': '{', ']': '[' };

  for (let ch of str) {
    if (ch in map) {
      if (stack.pop() !== map[ch]) {
        return false;
      }
    } else {
      stack.push(ch);
    }
  }

  return stack.length === 0;
};

const str = "()[]{}";
console.log(isValid(str));