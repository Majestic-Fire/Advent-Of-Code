import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  return rawInput.split("\n").map(line => line.split(''));
};

const part1 = (rawInput) => {
  const grid = parseInput(rawInput);
  const rows = grid.length;
  const cols = grid[0].length;

  let accessibleCount = 0; // less than 4 @ at 8 directions

  // 8 directions: up, down, left, right, and 4 diagonals
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],  // up, down, left, right
    [-1, -1], [-1, 1], [1, -1], [1, 1]  // diagonals
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '@') {
        let adjacentCount = 0;

        // Check all 8 directions
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;

          // Check bounds
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (grid[nr][nc] === '@') {
              adjacentCount++;

              // Early exit: if we found 4 or more, stop checking
              if (adjacentCount >= 4) break;
            }
          }
        }

        // Forklift can access if fewer than 4 adjacent rolls
        if (adjacentCount < 4) {
          accessibleCount++;
        }
      }
    }
  }

  return accessibleCount;
};

const part2 = (rawInput) => {
  let grid = parseInput(rawInput); // Make it mutable
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  const countAdjacent = (r, c) => {
    let count = 0;
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '@') {
        count++;
        if (count >= 4) break; // Early exit
      }
    }
    return count;
  };

  let totalRemoved = 0;

  while (true) {
    const toRemove = [];

    // Find all accessible rolls
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === '@' && countAdjacent(r, c) < 4) {
          toRemove.push([r, c]);
        }
      }
    }

    // If nothing to remove, we're done
    if (toRemove.length === 0) break;

    // Remove all accessible rolls
    for (const [r, c] of toRemove) {
      grid[r][c] = '.';
    }

    totalRemoved += toRemove.length;
  }

  return totalRemoved;
};

run({
  part1: {
    tests: [
      {
        input: ``,
        expected: "",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: ``,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
