// Problem

// Implement debounce(fn, delay).

// Behavior:

// When called repeatedly, it delays invoking fn until delay ms has passed since the last call.

// Only the last call’s arguments should be used.

// this should be preserved.
/**
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay) {
  // TODO: keep timer id in a closure
  let timerId;
  return function (...args) {
    // TODO 1: preserve `this`
    const context = this;
    // TODO 2: clear existing timer if any
    if (timerId) {
      clearTimeout(timerId);
    }
    // TODO 3: set new timer to call fn with correct `this` and args
    timerId = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  };
}

const log = (...args) => console.log("called with", args);
const debouncedLog = debounce(log, 200);

debouncedLog(1);
debouncedLog(2);
debouncedLog(3);
// after ~200ms, should log: called with [3]
