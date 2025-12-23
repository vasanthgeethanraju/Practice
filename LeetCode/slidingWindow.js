function mapped(str, target) {
  let maxSum = -Infinity;
  let windowSum = 0;
  let windowStart = 0;
  let bestStart = 0;


  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    windowSum += str[windowEnd];
    if( windowEnd >= target - 1) {

      if(windowSum > maxSum) {
        maxSum = windowSum;
        bestStart = windowStart;
      }
      windowSum -= str[windowStart];
      windowStart++;
    }
  }

  return { maxSum, bes: str.slice(bestStart, bestStart + target)};
}

const str = [3, 2, 4, 6, 7, 8, 9];
console.log(mapped(str, 3));