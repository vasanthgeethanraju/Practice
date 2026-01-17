// Problem

// Implement an LRU (Least Recently Used) cache with a fixed capacity.
// Rules:
// get(key) returns the value if present, otherwise -1.
// put(key, value) inserts/updates the key.
// When capacity is exceeded, evict the least recently used item.
// Any time a key is accessed via get or updated via put, it becomes most recently used.
// Use JavaScript (you can use Map).
class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    // TODO: store capacity
    this.capacity = capacity;
    // TODO: use a Map to maintain insertion order
    this.order    = new Map();
  }

  /**
   * @param {string} key
   * @returns {number}
   */
  get(key) {
    // TODO 1: if key not present return -1
    if(!this.order.has(key)) {
      return -1;
    }
    // TODO 2: if present, mark as most recently used:
    //   - read value
    let value = this.order.get(key);
    this.order.delete(key);
    //   - delete key
    //   - set key again with same value
    this.order.set(key, value);
    // TODO 3: return value
    return value;
  }

  /**
   * @param {string} key
   * @param {number} value
   * @returns {void}
   */
  put(key, value) {
    // TODO 1: if key exists, delete it first (so we can refresh recency)
    if(this.order.has(key)) {
      this.order.delete(key);
    }
    // TODO 2: set key -> value
    this.order.set(key, value);
    // TODO 3: if size > capacity, evict least recently used:
    //   - that's the first key in the Map
    if (this.order.size > this.capacity) {
      // Delete the first element in the Map (least recently used)
      this.order.delete(this.order.keys().next().value);
    }
  }
}

const cache = new LRUCache(2);
cache.put("a", 1);
cache.put("b", 2);
console.log(cache.get("a")); // 1
cache.put("c", 3);
console.log(cache.get("b")); // -1
console.log(cache.get("c")); // 3

const cache2 = new LRUCache(1);
cache2.put("x", 10);
cache2.put("x", 99);
console.log(cache2.get("x")); // 99
cache2.put("y", 5);           // evicts x
console.log(cache2.get("x")); // -1
