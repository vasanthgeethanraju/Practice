// Moving Average from Data Stream
// Queue helps you keep only the last K values in order.
// Whenever a new value comes in:
// add it to the queue
// if size > K, remove oldest
// compute average
// This is basically queue + sliding window.
class MovingAverage {
  constructor(k) {
    // TODO 1: Store k
    this.k = k;
    // TODO 2: Initialize a queue-like structure to hold the last k numbers
    this.queue = [];
    // TODO 3: Maintain a running sum so average is fast
    this.sum = 0;
  }

  next(val) {
    // TODO 4: Add val into the queue
    this.queue.push(val);
    // TODO 5: Add val to the running sum
    this.sum += val;
    // TODO 6: If queue size becomes more than k:
    //         - remove the oldest value from the queue
    //         - subtract it from the running sum
    if (this.queue.length > this.k) {
      const firstElem = this.queue.shift();
      this.sum -= firstElem;
    }
    // TODO 7: Return running sum divided by current queue size
    return this.sum / this.queue.length;
  }
}

// Sample
const m = new MovingAverage(3);
console.log(m.next(1));  // 1.0
console.log(m.next(10)); // 5.5
console.log(m.next(3));  // 4.6666666667
console.log(m.next(5));  // 6.0
