// A turn-based strategy game has a grid with water and land. The grid contains a true value 
// where it's water and false where it's land. The player controls a boat unit with a particular movement pattern. 
// It can only move to fixed destinations from its current position as shown in the video below: Legend • 
// Starting Point • Valid Movement 0:00 / 0:18 The boat can only move in a direct path through water to the possible destinations, 
// so a destination will become unreachable if there is land in the way. Implement the canTravelTo function, 
// that checks whether a destination is reachable by the boat. It should return true for destinations that are reachable 
// according to the pattern above, and false for unreachable or out of bounds destinations which are outside the grid. 
// For example, consider the following code: For example, consider the following code: const gameMatrix = l Ifalse, true, 
// true, false, false, falsel, Itrue, true, true, false, false, falsel, Itrue, true, true, true, true, truel, Ifalse, 
// true, true, false, true, truel, Ifalse, true, true, true, false, truel, [false, false, false, false, false, falsel, 1; 
//   console. log|canTravelTo(gameMatrix, 3, 2, 2, 2)); I/ true, Valid move console. log|canTravelTo(gameMatrix, 3, 2, 3, 4)); |/ false, 
//   Can't travel through land console. log|canTravelTo(gameMatrix, 3, 2, 6, 2)); I/ false, Out of bounds The following image shows valid and invalid destinations when the boat is in the position (3, 2):

function canTravelTo(gameMatrix, fromRow, fromColumn, toRow, toColumn) {
  const rows = gameMatrix.length;
  const cols = gameMatrix[0].length;

  // 1. Check bounds (both start and destination)
  if (
    fromRow < 0 || fromRow >= rows ||
    fromColumn < 0 || fromColumn >= cols ||
    toRow < 0 || toRow >= rows ||
    toColumn < 0 || toColumn >= cols
  ) {
    return false;
  }

  // 2. Start and destination must be water
  if (!gameMatrix[fromRow][fromColumn] || !gameMatrix[toRow][toColumn]) {
    return false;
  }

  // 3. Same cell
  if (fromRow === toRow && fromColumn === toColumn) {
    return true;
  }

  const dRow = toRow - fromRow;
  const dCol = toColumn - fromColumn;

  // 4. Valid movement directions only
  const isHorizontal = dRow === 0;
  const isVertical = dCol === 0;
  const isDiagonal = Math.abs(dRow) === Math.abs(dCol);

  if (!isHorizontal && !isVertical && !isDiagonal) {
    return false;
  }

  // 5. Step direction
  const stepRow = dRow === 0 ? 0 : dRow / Math.abs(dRow);
  const stepCol = dCol === 0 ? 0 : dCol / Math.abs(dCol);

  let currentRow = fromRow + stepRow;
  let currentCol = fromColumn + stepCol;

  // 6. Check path (exclude destination in loop)
  while (currentRow !== toRow || currentCol !== toColumn) {
    if (!gameMatrix[currentRow][currentCol]) {
      return false;
    }
    currentRow += stepRow;
    currentCol += stepCol;
  }

  return true;
}

const gameMatrix = [
  [false, true,  true,  false, false, false],
  [true,  true,  true,  false, false, false],
  [true,  true,  true,  true,  true,  true],
  [false, true,  true,  false, true,  true],
  [false, true,  true,  true,  false, true],
  [false, false, false, false, false, false],
];

console.log(canTravelTo(gameMatrix, 3, 2, 2, 2)); // true, Valid move
console.log(canTravelTo(gameMatrix, 3, 2, 3, 4)); // false, Can't travel through land
console.log(canTravelTo(gameMatrix, 3, 2, 6, 2)); // false, Out of bounds