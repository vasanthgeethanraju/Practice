// Leetcode #695 - Max Area of Islands

/**
 * Count max area of islands (connected components of '1's)
 * Adjacent cells: up, down, left, right
 */

function maxAreaOfIslands(grid) {
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
      return 0;
    }

    visited[r][c] = true;
    let area = 1; // count current cell

    for(const [dr, dc] of dirs) {
      area += dfs(r + dr, c + dc);
    }

    return area;
  }

  
  // TODO:
  // Loop through every cell in the grid
  // When you find an unvisited land cell:
  //   - increment count
  //   - run dfs from that cell

  let maxArea = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if(grid[r][c] === 1 && !visited[r][c]) {
        const area = dfs(r,c);
        maxArea = Math.max(maxArea, area);
      }
    }
  }

  return maxArea;
}

// Test cases
const grid1 = [
  [1,1,0],
  [1,0,0],
  [0,1,1]
];
// Expected output: 3
console.log(maxAreaOfIslands(grid1));

const grid2 = [
  [1,1,1],
  [0,1,0],
  [1,1,1]
];
// Expected output: 7
console.log(maxAreaOfIslands(grid2));
