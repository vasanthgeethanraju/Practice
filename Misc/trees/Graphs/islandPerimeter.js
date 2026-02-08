// Leetcode #463 - Island Perimeter

/**
 * Calculate the perimeter of the island
 * Each land cell contributes 4 edges
 * Subtract shared edges between adjacent land cells
 */

function islandPerimeter(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  let perimeter = 0;

  // TODO:
  // Loop through every cell in the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {

      // TODO:
      // If current cell is land:
      //   1. add 4 to perimeter
      //   2. if top neighbor is land, subtract 2
      //   3. if left neighbor is land, subtract 2
      if (grid[r][c] === 1) {
        perimeter += 4;

        // check top neighbor
        if (r > 0 && grid[r - 1][c] === 1) {
          perimeter -= 2;
        }

        // check left neighbor
        if (c > 0 && grid[r][c - 1] === 1) {
          perimeter -= 2;
        }
      }
    }
  }

  return perimeter;
}



// Test cases
const grid1 = [
  [1,1,0],
  [1,0,0],
  [0,1,1]
];
// Expected output: 14
console.log(islandPerimeter(grid1));

const grid2 = [
  [1,1,1],
  [0,1,0],
  [1,1,1]
];
// Expected output: 16
console.log(islandPerimeter(grid2));