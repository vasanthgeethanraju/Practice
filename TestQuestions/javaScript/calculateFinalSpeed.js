// A gaming company is working on a platformer game. They need a function that will compute the character's final speed, given a map and a starting speed.
// The terrain on which the game character moves forward is made from various pieces of land placed together. Implement the function calculateFinalSpeed which takes the initial speed of the character, and an array of degrees of inclination that represent the uneven terrain.
// The speed of the character will increase or decrease proportionally to the incline of the land, as shown in the image below:

// The magnitude of the angle of inclination will always be ‹ 90°.
// The speed change occurs only once for each piece of land. The function should immediately return 0 as the final speed if an incline reduces the speed to 0 or below 0, which makes the character lose 1 life.

function calculateFinalSpeed(initialSpeed, inclinations) {
  for (let inc of inclinations) {
    initialSpeed = initialSpeed - inc;

    if (initialSpeed <= 0) {
      return 0;
    }
  }
  return initialSpeed;
}

console.log(calculateFinalSpeed(60, [0, 30, 0, -45, 0])); // 75