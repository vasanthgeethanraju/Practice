function maxRequestsInWindow(timestamps, windowSize) {
  // Step 1: sort timestamps
  timestamps.sort((a, b) => a - b);

  let left = 0;
  let maxCount = 0;

  for (let right = 0; right < timestamps.length; right++) {
    while (timestamps[right] - timestamps[left] >= windowSize) {
      left++;
    }

    maxCount = Math.max(maxCount, right - left + 1);
  }

  return maxCount;
}

// Example
const timestamps = [1, 5, 2, 7, 10, 12, 6];
const windowSize = 4;

console.log(maxRequestsInWindow(timestamps, windowSize)); // 3