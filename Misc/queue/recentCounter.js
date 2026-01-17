// Recent Counter (Requests in last 3000ms)

// Queue is perfect for “keep only recent events”.
// Whenever a new timestamp comes in:
// push it
// remove all timestamps that are too old
// answer = queue size
class RecentCounter {
  constructor() {
    // TODO 1: Initialize a queue-like structure to store timestamps
    this.queue = [];
  }

  ping(t) {
    // TODO 2: Add the new timestamp t to the queue
    this.queue.push(t);
    // TODO 3: Remove timestamps from the front while they are < t - 3000
    while(this.queue[0] < t - 3000) {
      this.queue.shift();
    }
    // TODO 4: Return the size of the queue
    return this.queue.length;
  }
}

// Sample
const rc = new RecentCounter();
console.log(rc.ping(1));    // 1
console.log(rc.ping(100));  // 2
console.log(rc.ping(3001)); // 3
console.log(rc.ping(3002)); // 3
