//Prompt (interview style):
// Build a simple rate limiter: each user can make at most N requests per windowMs. Return true if allowed, else false.

class RateLimiter {
  constructor({ limit, windowMs }) {
    this.limit = limit;
    this.windowMs = windowMs;
    // TODO: initialize storage
    this.storage = new Map();
  }

  // TODO: returns true if request is allowed, else false
  allow(userId, timestampMs) {
    if (!this.storage.has(userId)) {
      this.storage.set(userId, []);
    }
    const timestamps = this.storage.get(userId);
    const windowStart = timestampMs - this.windowMs;

    while (timestamps.length && timestamps[0] <= windowStart) {
      timestamps.shift(); // remove old requests
    }

    // Check if the user is within the limit
    if (timestamps.length < this.limit) {
      timestamps.push(timestampMs); // record this request
      return true; // allowed
    } else {
      return false; // denied
    }
  }
}

const rl = new RateLimiter({ limit: 2, windowMs: 60000 });

console.log(rl.allow("u1", 10)); 
console.log(rl.allow("u1", 1000));
console.log(rl.allow("u1", 2000));
console.log(rl.allow("u1", 61000));

//output 
// true
// true
// false
// true