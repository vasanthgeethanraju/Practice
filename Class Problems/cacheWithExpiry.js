// 8️⃣ Cache With Expiry (Class + Time Logic)
// Goal: Practice encapsulation & small algorithm.

// Create Cache class:

// Stores keys with:

// value

// expiry timestamp (now + ttlMs)

// Methods:

// set(key, value, ttlMs)

// get(key):

// returns value if not expired

// otherwise returns null (or undefined, but be consistent)

// (You can simulate time instead of real Date.now() if you like, but this is mid-level.)

class Cache {
    constructor() {
      this.store = new Map();
    }
  
    set(key, value, ttlMs) {
      const expiry = Date.now() + ttlMs;
      this.store.set(key, { value, expiry });
    }
  
    get(key) {
      const entry = this.store.get(key);
      if (!entry) return null;
  
      if (Date.now() > entry.expiry) {
        this.store.delete(key);
        return null;
      }
  
      return entry.value;
    }
  }
  
  //input
  const c = new Cache();
  c.set("a", 10, 1000);
  console.log(c.get("a"));
  
  console.log(c.get("b"));
  
  //output
  // 10
  // null   // or undefined, but pick one and stick with it