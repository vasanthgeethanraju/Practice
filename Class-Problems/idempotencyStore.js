// Prevent duplicate processing: if the same (userId, key) is seen again, return the original result instead of “processing” again.

class IdempotencyStore {
  constructor() {
    // TODO: store (userId:key) -> result
    this.store = new Map();
  }

  // TODO: if key exists return { hit: true, result }, else store and return { hit:false, result }
  run(userId, key, computeFn) {
    if(!this.store.has(userId)) {
      this.store.set(userId, new Map());
    }
    let func = this.store.get(userId);
    if(!func.has(key)) {
      func.set(key, computeFn());
      return {hit : false, result: func.get(key)};
    } else {
      return { hit: true, result: func.get(key) };
    }
  }
}


let counter = 0;
const store = new IdempotencyStore();

const res1 = store.run("u1", "abc", () => ({ value: ++counter }));
const res2 = store.run("u1", "abc", () => ({ value: ++counter }));
const res3 = store.run("u1", "xyz", () => ({ value: ++counter }));

console.log(res1);
console.log(res2);
console.log(res3);


//output:
// { hit: false, result: { value: 1 } }
// { hit: true,  result: { value: 1 } }
// { hit: false, result: { value: 2 } }