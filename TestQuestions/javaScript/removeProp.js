// Implement the removeProperty function which takes an object and property name, and does the following:
// If the object obj has a property prop, the function removes the property from the object and returns true; in all other cases it returns false.

function removeProperty(obj, prop) {
  if(prop in obj) {
    delete obj[prop];
    return true;
  }
  return false;
}

console.log(removeProperty({ a: 1, b: 2 }, "a")); // should be true
console.log(removeProperty({ a: 1, b: 2 }, "c")); // should be false
console.log(removeProperty({ a: 0 }, "a"));       // should be true