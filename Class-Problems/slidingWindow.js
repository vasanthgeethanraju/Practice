// Count how many events occurred in the last N milliseconds.

class SlidingWindowCounter {
  constructor(windowMs) {
    this.windowMs = windowMs;
    // TODO: store timestamps
    this.store = [];
  }

  // TODO: record an event at timestampMs
  record(timestampMs) {
    this.store.push(timestampMs);
  }

  // TODO: return count of events in [timestampMs - windowMs, timestampMs]
  count(timestampMs) {
    const start = timestampMs - this.windowMs;

    while (this.store.length && this.store[0] < start) {
      this.store.shift();
    }
    return this.store.length;
  }
}


const c = new SlidingWindowCounter(1000);

c.record(0);
c.record(200);
c.record(800);
c.record(1200);

console.log(c.count(1200));


//output:
// 3  --> events at 200, 800, 1200
