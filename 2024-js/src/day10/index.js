import run from "aocrunner";
import * as Util from "../utils/index.js";

const directions = [
  { dr: -1, dc: 0 }, // up
  { dr: 0, dc: 1 },  // right
  { dr: 1, dc: 0 },  // down
  { dr: 0, dc: -1 }  // left
];

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const grid = input.split("\n").map(line => line.split("").map(Number));
  const rows = grid.length;
  const cols = grid[0].length;

  const findPath_reachableTail = (grid, r, c, visited, targetHeight = 9) => {
    if (grid[r][c] === targetHeight) {
      visited.add(`${r},${c}`); // mark trail tail visited
      return 1
    };

    let pathCount = 0;
    const nextHeight = grid[r][c] + 1;
    for (const { dr, dc } of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (Util.gridU.isOutOfRange(nr, nc, grid)) continue; // out of range
      if (visited.has(`${nr},${nc}`)) continue; // the tail is visited
      if (nr === r && nc === c) continue; // dont search where it come from

      if (grid[nr][nc] === nextHeight) {
        pathCount += findPath_reachableTail(grid, nr, nc, visited);
      }
    }

    return pathCount;
  };

  let result = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        const visited = new Set();
        result += findPath_reachableTail(grid, r, c, visited);
      }
    }
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const grid = input.split("\n").map(line => line.split("").map(Number));
  const rows = grid.length;
  const cols = grid[0].length;

  const findPath = (grid, r, c, visited, targetHeight = 9) => {
    if (grid[r][c] === targetHeight) {
      // visited.add(`${r},${c}`); // mark trail tail visited
      return 1
    };

    let pathCount = 0;
    const nextHeight = grid[r][c] + 1;
    for (const { dr, dc } of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (Util.gridU.isOutOfRange(nr, nc, grid)) continue; // out of range
      // if (visited.has(`${nr},${nc}`)) continue; // the tail is visited
      if (nr === r && nc === c) continue; // dont search where it come from

      if (grid[nr][nc] === nextHeight) {
        pathCount += findPath(grid, nr, nc, visited);
      }
    }

    return pathCount;
  };

  let result = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        const visited = new Set();
        result += findPath(grid, r, c, visited);
      }
    }
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
