//leetcode 1114 
// This is a classic concurrency / multithreading interview question

class Foo {
    constructor() {
      // Gate 1: opened when first() completes
      this.firstDone = new Promise((resolve) => {
        this._resolveFirst = resolve;
      });
  
      // Gate 2: opened when second() completes
      this.secondDone = new Promise((resolve) => {
        this._resolveSecond = resolve;
      });
    }
  
    async printFirst(printFirst) {
      // printFirst() outputs "first". Do not change or remove this line.
      printFirst();
  
      // Signal that first is done
      this._resolveFirst();
    }
  
    async printSecond(printSecond) {
      // Wait until first() has completed
      await this.firstDone;
  
      // printSecond() outputs "second". Do not change or remove this line.
      printSecond();
  
      // Signal that second is done
      this._resolveSecond();
    }
  
    async printThird(printThird) {
      // Wait until second() has completed
      await this.secondDone;
  
      // printThird() outputs "third". Do not change or remove this line.
      printThird();
    }
  }

  // Example usage:
  const foo = new Foo();
  foo.printFirst(() => console.log("first"));
  foo.printSecond(() => console.log("second"));
  foo.printThird(() => console.log("third"));

  // Output:
  // first
  // second
  // third