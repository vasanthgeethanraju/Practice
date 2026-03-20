function secondsToRemoveOccurrences(str) { 
  let zeros = 0;
  let time = 0;

  for(const s of str) {
    if(s === "0") {
      zeros++
    } else if(zeros > 0) {
      time = Math.max(time+1, zeros);
    }
  }
  return time;
}

console.log(secondsToRemoveOccurrences("001011")); // 4