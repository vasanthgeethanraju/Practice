// Multiple clients may send the same request (same requestId). Process each request only once. If duplicate comes, return cached result.

class RequestDeduplicator {
  constructor() {
    // TODO: store processed requestId -> result
    this.storeJobs = new Map();
  }

  // TODO: if requestId already processed, return cached result
  // else compute using handlerFn, store, and return it
  process(requestId, handlerFn) {
    if(!this.storeJobs.has(requestId)) {
      this.storeJobs.set(requestId, handlerFn());
    }
    return this.storeJobs.get(requestId);
  }
}


const d = new RequestDeduplicator();
let counter = 0;

console.log(d.process("r1", () => ++counter));
console.log(d.process("r1", () => ++counter));
console.log(d.process("r2", () => ++counter));

//output:
// 1
// 1
// 2



// Short answer: it’s correct, but not interview-optimal 🙂
// It solves the toy case, but interviewers usually expect you to notice (and fix) a few important gaps.

// Let’s break it down.

// What your solution gets right ✅

// Correctly deduplicates by requestId

// Clean and readable

// Passes the given example

// Uses Map (good signal)

// For a junior / warm-up question, this is totally fine.

// Where interviewers will push back ❌
// 1. Async handling (big one)

// Most real dedup problems involve async handlers (API calls, DB queries).

// class RequestDeduplicator {
//   constructor() {
//     this.jobs = new Map();
//   }

//   async process(requestId, handlerFn) {
//     if (this.jobs.has(requestId)) {
//       return this.jobs.get(requestId);
//     }

//     const promise = (async () => {
//       try {
//         return await handlerFn();
//       } catch (err) {
//         this.jobs.delete(requestId); // allow retry
//         throw err;
//       }
//     })();

//     this.jobs.set(requestId, promise);
//     return promise;
//   }
// }

// class RequestDeduplicator {
//   constructor() {
//     this.jobs = new Map();
//   }

//   async process(requestId, handlerFn) {
//     if (this.jobs.has(requestId)) {
//       return this.jobs.get(requestId);
//     }

//     const promise = Promise.resolve(handlerFn()).catch((err) => {
//       this.jobs.delete(requestId); // allow retry
//       throw err;
//     });

//     this.jobs.set(requestId, promise);
//     return promise;
//   }
// }
