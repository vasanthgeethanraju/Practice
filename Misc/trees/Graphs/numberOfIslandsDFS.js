// Leetcode #200 - Number of Islands

/**
 * Count number of islands (connected components of '1's)
 * Adjacent cells: up, down, left, right
 */

function numberOfIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  // TODO: create a visited matrix (or mutate grid if allowed)
  const visited = Array.from({ length: rows}, () => Array(cols).fill(false));

  // Direction vectors
  const dirs = [
    [1, 0],   // down
    [-1, 0],  // up
    [0, 1],   // right
    [0, -1],  // left
  ];

  function dfs(r, c) {
    // TODO:
    // 1. boundary check
    // 2. skip water or visited
    // 3. mark current cell visited
    // 4. dfs on all 4 neighbors
    if(r < 0  || r >= rows || c < 0 || c >= cols || grid[r][c] === 0 || visited[r][c]) {
      return;
    }

    visited[r][c] = true;

    for(const [dr, dc] of dirs) {
      dfs(r + dr, c + dc);
    }
  }

  let count = 0;

  // TODO:
  // Loop through every cell in the grid
  // When you find an unvisited land cell:
  //   - increment count
  //   - run dfs from that cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if(grid[r][c] === 1 && !visited[r][c]) {
        count++;
        dfs(r,c);
      }
    }
  }

  return count;
}

// Test cases
const grid1 = [
  [1,1,0],
  [1,0,0],
  [0,1,1]
];
// Expected output: 2
console.log(numberOfIslands(grid1));

const grid2 = [
  [1,1,1],
  [0,1,0],
  [1,1,1]
];
// Expected output: 1
console.log(numberOfIslands(grid2));
