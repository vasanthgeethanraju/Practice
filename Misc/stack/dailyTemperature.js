// Daily Temperatures (Monotonic Stack)
// Concept (quick)

// We use a monotonic decreasing stack to track indexes of days waiting for a warmer day.

// If today’s temp is higher than the temp at the top index → we found the answer for that previous day.
function dailyTemperatures(temperatures) {
  // TODO 1: Create an answer array filled with 0s (same length as temperatures)
  // Example: const res = new Array(temperatures.length).fill(0)
  const res = new Array(temperatures.length).fill(0);
  // TODO 2: Create an empty stack
  // IMPORTANT: stack stores INDEXES, not temperatures
  // Example: stack = [0, 3, 5] means those days are waiting for a warmer day
  let stack = [];

  // TODO 3: Loop i from 0 to temperatures.length - 1
  //    - While stack is not empty AND temperatures[i] > temperatures[stack top index]:
  //         - Pop the index prevIndex from stack
  //         - res[prevIndex] = i - prevIndex
  //
  //    - Push i into stack
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      res[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }
  // TODO 4: Return res
  return res;
}

const temperatures = [73,74,75,71,69,72,76,73];
console.log(dailyTemperatures(temperatures));
// [1,1,4,2,1,1,0,0]
