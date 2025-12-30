// Write a program to calculate the performance of a roller coaster. Assume the following formulas: Comfort: Minimum of 1.0, 1.0 / BumpsPerSecond, 1.0 / MaxSpeed. 
// Overall Performance: ScaleFactor * Comfort * MaxSpeed. Given values include the bumps per second (BumpsPerSecond), the maximum speed of the roller coaster (MaxSpeed), and a variable coefficient (ScaleFactor). 
// Based on these values, calculate the comfort and overall performance of the roller coaster. Input Format: Integer BumpsPerSecond (0 < BumpsPerSecond <= 100) Float MaxSpeed (0.1 <= MaxSpeed <= 100.0) Float ScaleFactor (0.1 <= ScaleFactor <= 10.0) 
// Output Format: Two float numbers representing the calculated comfort and overall performance (results rounded to two decimal places).

function rollerCoasterPerformance(bumpsPerSecond, maxSpeed, scaleFactor) {
  const comfort = Math.min(1.0, 1.0 / bumpsPerSecond, 1.0 / maxSpeed);

  const overallPerformance = scaleFactor * comfort * maxSpeed;

  // Round to 2 decimal places
  return { comfort : comfort.toFixed(2), OP: overallPerformance.toFixed(2)} ;
}

// Example usage:
console.log(rollerCoasterPerformance(5, 20.0, 2.5));
