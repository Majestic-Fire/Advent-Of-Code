import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  const grid = rawInput.split("\n").map(line => line.split(''));

  // Find source position (S in first row)
  let sourceCol = -1;
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[0][col] === 'S') {
      sourceCol = col;
      break;
    }
  }

  return { grid, sourceCol };
};

const countSplits = (grid, row, col, visitedSplitters = new Set()) => {
  // Out of bounds
  if (row >= grid.length || col < 0 || col >= grid[0].length) {
    return 0;
  }

  // Travel down until we hit a splitter
  while (row < grid.length && grid[row][col] !== '^') {
    row++;
  }

  // Exit the manifold
  if (row >= grid.length) {
    return 0;
  }

  // Found a splitter
  const splitterKey = `${row},${col}`;

  // Already counted this splitter
  if (visitedSplitters.has(splitterKey)) {
    return 0;
  }

  visitedSplitters.add(splitterKey);

  // Count this split + recurse left and right
  return 1 + countSplits(grid, row + 1, col - 1, visitedSplitters) + countSplits(grid, row + 1, col + 1, visitedSplitters);
};

const part1 = (rawInput) => {
  const { grid, sourceCol } = parseInput(rawInput);

  return countSplits(grid, 0, sourceCol);
};

const part2 = (rawInput) => {
  const { grid, sourceCol } = parseInput(rawInput);

  // Track how many timelines reach each column at current row
  let currentRow = new Map();
  currentRow.set(sourceCol, 1);

  for (let row = 0; row < grid.length; row++) {
    const nextRow = new Map();

    for (const [col, count] of currentRow) {
      // Check if there's a splitter at this position
      if (grid[row][col] === '^') {
        // Split into left and right
        const leftCol = col - 1;
        const rightCol = col + 1;

        nextRow.set(leftCol, (nextRow.get(leftCol) || 0) + count);
        nextRow.set(rightCol, (nextRow.get(rightCol) || 0) + count);
      } else {
        // Continue straight down
        nextRow.set(col, (nextRow.get(col) || 0) + count);
      }
    }

    currentRow = nextRow;
  }

  // Sum all timelines that exited
  return [...currentRow.values()].reduce((sum, count) => sum + count, 0);
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
        input: `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`,
        expected: 40,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
