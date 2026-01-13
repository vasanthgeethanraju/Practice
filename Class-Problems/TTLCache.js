// Build an in-memory cache that supports set(key, value, ttlMs) and get(key, nowMs) which returns null if missing/expired.

class TTLCache {
  constructor() {
    // TODO: store values + expirations
    this.store = new Map();
  }

  // TODO: store value with expiration time = nowMs + ttlMs
  set(key, value, ttlMs, nowMs) {
    let expiry = ttlMs + nowMs; 
    this.store.set(key, {value, expiry: expiry});
  }

  // TODO: return value if present and not expired at nowMs, else null
  get(key, nowMs) {
    let isPresent = this.store.get(key);
    if (!isPresent) return null;  
    if(nowMs > isPresent.expiry) {
      this.store.delete(key);
      return null;
    }
    return isPresent.value;
  }

  // TODO: optional: remove key
  delete(key) {
    this.store.delete(key);
  }
}


const c = new TTLCache();
c.set("a", 1, 1000, 0);      // expires at 1000
console.log(c.get("a", 500));
console.log(c.get("a", 1000));
console.log(c.get("a", 1001));


//output:
// 1
// 1
// null





