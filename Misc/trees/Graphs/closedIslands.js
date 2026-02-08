// Leetcode #1254 - Number of Closed Islands
// Normalized: 1 = land, 0 = water

function closedIsland(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const dirs = [
    [1, 0],   // down
    [-1, 0],  // up
    [0, 1],   // right
    [0, -1],  // left
  ];

  function dfs(r, c) {
    // TODO: if out of bounds → touches boundary → NOT closed
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;

    // TODO: if water or already visited → safe
    if (grid[r][c] === 0) return true;

    // TODO: mark land as visited (turn 1 → 0)
    grid[r][c] = 0;

    let isClosed = true;

    // TODO: dfs in all 4 directions
    for (const [dr, dc] of dirs) {
      if (!dfs(r + dr, c + dc)) {
        isClosed = false;
      }
    }

    return isClosed;
  }

  let count = 0;

  // TODO: loop through all cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        if (dfs(r, c)) count++;
      }
    }
  }

  return count;
}

// test cases
const grid1 = [
  [1,1,1,1,1,1,1,0],
  [1,0,0,0,0,1,1,0],
  [1,0,1,0,1,1,1,0],
  [1,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,1,0]
];
// Expected output: 1
console.log(closedIsland(grid1));

const grid2 = [
  [0,0,0,0],
  [0,1,1,0],
  [0,1,1,0],
  [0,0,0,0]
];
console.log(closedIsland(grid2)); // Output: 1

const grid3 = [
  [1,1,0,1],
  [1,0,0,0],
  [1,1,0,0],
  [0,0,0,0]
];
console.log(closedIsland(grid3)); // Output: 0

const grid4 = [
  [0,0,0,0,0,0,0],
  [0,1,1,0,1,1,0],
  [0,1,1,0,1,1,0],
  [0,0,0,0,0,0,0]
];

console.log(closedIsland(grid4)); // Output: 2
