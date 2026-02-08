// Leetcode #733 - Flood Fill

/**
 * Recolor all connected cells starting from (sr, sc)
 * Only cells with the original color are replaced
 * Adjacent cells: up, down, left, right
 */

function floodFill(image, sr, sc, color) {
  const rows = image.length;
  const cols = image[0].length;

  // TODO: store the original color
  const startColor = image[sr][sc];

  // TODO: if the color is the same, no work needed
  if (startColor === color) {
    return image;
  }

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
    // 2. stop if color does not match startColor
    // 3. recolor current cell
    // 4. dfs on all 4 neighbors
    if (
      r < 0 || r >= rows ||
      c < 0 || c >= cols ||
      image[r][c] !== startColor
    ) {
      return;
    }

    image[r][c] = color;

    for (const [dr, dc] of dirs) {
      dfs(r + dr, c + dc);
    }
  }

  dfs(sr, sc);
  return image;
}

// test cases
const image = [
  [1,1,1],
  [1,1,0],
  [1,0,1]
];

floodFill(image, 1, 1, 2);
console.log(image);
// Expected output:
// [
//   [2,2,2],
//   [2,2,0],
//   [2,0,1]
// ]

const image2 = [
  [0,0,0],
  [0,0,0]
];

floodFill(image2, 0, 0, 1);
console.log(image2);
// Expected output:
// [
//   [1,1,1],
//   [1,1,1]
// ]

const image3 = [
  [2, 1, 1],
  [1, 1, 0],
  [1, 0, 1]
];
floodFill(image3, 0, 0, 2);
console.log(image3);
// Expected output:
// [
//   [2, 1, 1],
//   [1, 1, 0],
//   [1, 0, 1]
// ]