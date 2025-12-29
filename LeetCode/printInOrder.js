//leetcode 1114 
// This is a classic concurrency / multithreading interview question
// without a new class
class Foo {
  constructor() {
    this.firstDone = new Promise((resolve) => {
      this._resolveFirst = resolve;
    });
    this.secondDone = new Promise((resolve) => {
      this._resolveSecond = resolve;
    });
  }

  async printFirst(printFirst) {
    printFirst();
    this._resolveFirst();
  }

  async printSecond(printSecond) {
    await this.firstDone;
    printSecond();
    this._resolveSecond();
  }

  async printThird(printThird) {
    await this.secondDone;
    printThird();
  }
}

// with new class holding the common promise/resolve logic
// class Deferred {
//   constructor() {
//     this.promise = new Promise((resolve) => {
//       this.resolve = resolve;
//     });
//   }
// }

// class Foo {
//   constructor() {
//     this.firstDone = new Deferred();
//     this.secondDone = new Deferred();
//   }

//   async printFirst(printFirst) {
//     printFirst();
//     this.firstDone.resolve();
//   }

//   async printSecond(printSecond) {
//     await this.firstDone.promise;
//     printSecond();
//     this.secondDone.resolve();
//   }

//   async printThird(printThird) {
//     await this.secondDone.promise;
//     printThird();
//   }
// }


// Example usage:
const foo = new Foo();
foo.printFirst(() => console.log("first"));
foo.printSecond(() => console.log("second"));
foo.printThird(() => console.log("third"));

// Output:
// first
// second
// third