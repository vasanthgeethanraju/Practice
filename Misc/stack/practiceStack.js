// reverse an array
let arr = [1, 2, 3, 4];
let stack1 = [];
let res1 = [];

for(let ch of arr) {
  stack1.push(ch);
}

while(stack1.length > 0) {
  res1.push(stack1.pop())
}
console.log(res1);



// reverse a string
let str = "abcd";
let stack2 = [];
let res2 = [];

for(let ch of str) {
  stack2.push(ch);
}

while(stack2.length > 0) {
  res2.push(stack2.pop())
}
console.log(res2.join(""));
