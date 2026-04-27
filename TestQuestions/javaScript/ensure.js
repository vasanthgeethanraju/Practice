// Implement the ensure function so that it throws an error if called without arguments or the argument is undefined.
// Otherwise it should return the given value.

function ensure(value) {
  // Your code goes here
  if(value === undefined) {
    throw new Error(); 
  } else {
    return value;
  }
}

try {
  console.log(ensure());
} catch(err) {
  console.log(err);
}