//leetcode 227

function calculate(s) {
  let total = 0,
      prev = 0,
      num = 0;

  let op = '+';

  const n = s.length;
  
  let i = 0;
  
  while (i <= n) {
    const ch = i < n ? s[i] : '+';
    if (ch === ' ') {
      i++;
      continue;
    }
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + (ch.charCodeAt(0) - 48);
    } else {
      if (op === '+') {
        total += prev;
        prev = num;
      } else if (op === '-') {
        total += prev;
        prev = -num;
      } else if (op === '*') {
        prev = prev * num;
      } else {
        prev = (prev / num) | 0;
      }
      op = ch;
      num = 0;
    }
    i++;
  }
  total += prev;
  return total;
}

const s = " 3/2 ";
console.log(calculate(s));