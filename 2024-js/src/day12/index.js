import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => rawInput;

const getNeighbors = (row, col, numRows, numCols) => {
  const neighbors = [];
  if (row > 0) neighbors.push([row - 1, col]);
  if (row < numRows - 1) neighbors.push([row + 1, col]);
  if (col > 0) neighbors.push([row, col - 1]);
  if (col < numCols - 1) neighbors.push([row, col + 1]);
  return neighbors;
};

const dfs = (grid, row, col, visited) => {
  const stack = [[row, col]];
  const regionId = grid[row][col];
  let area = 0;
  let perimeter = 0;

  while (stack.length > 0) {
    const [r, c] = stack.pop();
    if (visited.has(`${r},${c}`)) continue;
    visited.add(`${r},${c}`);
    area++;

    const neighbors = getNeighbors(r, c, grid.length, grid[0].length);
    let localPerimeter = 4;

    for (const [nr, nc] of neighbors) {
      if (grid[nr][nc] === regionId) {
        stack.push([nr, nc]);
        localPerimeter--;
      }
    }

    perimeter += localPerimeter;
  }

  return { area, perimeter };
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const grid = input.split("\n").map((row) => row.split(""));
  const visited = new Set();
  let totalCost = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (!visited.has(`${row},${col}`)) {
        const { area, perimeter } = dfs(grid, row, col, visited);
        totalCost += area * perimeter;
      }
    }
  }

  return totalCost;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let result = 0;

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
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
  onlyTests: true,
});
