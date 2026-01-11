// Write a function that takes a string containing JavaScript code and determines whether the code is valid JavaScript syntax. 
// The code should not involve any specific frameworks.

function isValidJavaScriptSyntax(code) {
  if (typeof code !== "string") return false;

  try {
    // new Function parses the string as a function body.
    // If syntax is invalid, it throws (usually SyntaxError).
    // This does not run the code; it only parses/compiles it.
    new Function(code);
    return true;
  } catch (err) {
    // If you only want to treat syntax errors as invalid and
    // ignore other errors (rare here), you can check err instanceof SyntaxError.
    return false;
  }
}

// Examples:
console.log(isValidJavaScriptSyntax("var x = 5;")); // true
console.log(isValidJavaScriptSyntax("var x = ;"));  // false
console.log(isValidJavaScriptSyntax("if(2 > 3) { } else {console.log(1)}"));  // true
