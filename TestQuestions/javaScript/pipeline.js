// As part of a data processing pipeline, complete the implementation of the pipeline function:
// • The pipeline function should accept a variable number of functions, and it should return a new function that accepts one parameter arg.
// • The returned function should call the first function in pipeline with the parameter arg, and call the second function with the result of the first function.
// • The returned function should continue calling each function in pipeline in order, following the same pattern, and return the value from the last function.
// For example, calling pipeline(x => x*3,x=> x + 1, x=> x / 2), and then calling the returned function with 3 should return 5.0.


function pipeline(...funcs) {
  return (arg) => {
    // Your code goes here
    let res = arg; 

    for(const func of funcs) {
      res = func(res);
    }

    return res;
  }
}

let fun = pipeline(x => x * 3, x => x + 1, x => x / 2);
console.log(fun(3)); // Should print 5