// Leetcode #79 Word Search
/**
 * Check if a word exists in the board
 * Adjacent cells: up, down, left, right
 * Each cell can be used only once per path
 */
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  // Direction vectors
  const dirs = [
    [1, 0],   // down
    [-1, 0],  // up
    [0, 1],   // right
    [0, -1],  // left
  ];

  /**
   * DFS backtracking helper
   * @param {number} r - current row
   * @param {number} c - current column
   * @param {number} idx - current index in word
   */
  function dfs(r, c, idx) {
    // TODO 1:
    // If idx === word.length
    //   - we have matched all characters
    //   - return true
    if(idx === word.length) {
      return true;
    }

    // TODO 2:
    // Boundary checks:
    //   - out of bounds
    //   - current cell does NOT match word[idx]
    // If any fail, return false (PRUNE)
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[idx]) {
      return false;
    }
    // TODO 3:
    // Mark current cell as visited
    // (temporarily change board[r][c])
    const temp = board[r][c];
    board[r][c] = '#';

    // TODO 4:
    // Explore all 4 directions
    // If any recursive call returns true → return true
    for (const [dr, dc] of dirs) {
      // If any recursive call returns true, return true
      if (dfs(r + dr, c + dc, idx + 1)) {
        return true;
      }
    }

    // TODO 5:
    // Undo the visit (restore original character)
    board[r][c] = temp;

    // TODO 6:
    // If no direction works, return false
    return false;
  }

  // TODO 7:
  // Loop through every cell in the grid
  // If board[r][c] matches word[0]:
  //   - start dfs from that cell
  //   - if dfs returns true, return true

  // TODO 8:
  // If word not found anywhere, return false

  for(let r=0; r<rows; r++) {
    for(let c=0; c<cols; c++) {
      if(board[r][c] === word[0]) {
        if(dfs(r, c, 0)) {
          return true;
        }
      }
    }
  }

  return false;
}
// ====================
// Test Cases
// ====================

// Test case 1
const board1 = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];
console.log(exist(board1, "ABCCED"));
// Expected output: true


// Test case 2
const board2 = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];
console.log(exist(board2, "SEE"));
// Expected output: true


// Test case 3
const board3 = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];
console.log(exist(board3, "ABCB"));
// Expected output: false


// Test case 4 (single cell)
const board4 = [['A']];
console.log(exist(board4, "A"));
// Expected output: true