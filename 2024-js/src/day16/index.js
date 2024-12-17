import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => rawInput;

const directions = [
  { r: -1, c: 0, symbol: '^' }, // Up
  { r: 0, c: 1, symbol: '>' },  // Right
  { r: 1, c: 0, symbol: 'v' },  // Down
  { r: 0, c: -1, symbol: '<' }  // Left
];

function findStart(grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 'S') {
        return { r, c };
      }
    }
  }
  return null;
};

let minScore;
let visited;

function findMinScore(grid, r, c, direction, score) {
  // Base case
  if (grid[r][c] === 'E') {
    // console.log(grid.map(line => line.join('')).join('\n'));
    minScore = Math.min(minScore, score);
    return;
  }

  // Prune branches that exceed the current minimum score
  if (score >= minScore) {
    return;
  }

  // Mark the current cell with the direction symbol
  const originalSymbol = grid[r][c];
  grid[r][c] = directions[direction].symbol;

  // Add the current state to the visited set
  const state = `${r},${c},${direction}`;
  if (visited.has(state)) {
    grid[r][c] = originalSymbol;
    return;
  }
  visited.add(state);

  // Try moving forward
  const newR = r + directions[direction].r;
  const newC = c + directions[direction].c;
  if (grid[newR][newC] === '.' || grid[newR][newC] === 'E') {
    findMinScore(grid, newR, newC, direction, score + 1);
  }

  // Try rotating clockwise
  const newDirectionClockwise = (direction + 1) % 4;
  findMinScore(grid, r, c, newDirectionClockwise, score + 1000);

  // Try rotating counterclockwise
  const newDirectionCounterclockwise = (direction + 3) % 4;
  findMinScore(grid, r, c, newDirectionCounterclockwise, score + 1000);

  // Restore the original symbol
  grid[r][c] = originalSymbol;

  // Remove the current state from the visited set (backtracking)
  visited.delete(state);
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const grid = input.split('\n').map(line => line.split(''));
  const { r: startR, c: startC } = findStart(grid);
  const startDirection = 1; // East

  console.log(startR, startC);

  minScore = Number.MAX_SAFE_INTEGER;
  visited = new Set();

  findMinScore(grid, startR, startC, startDirection, 0);

  return minScore;
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
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`,
        expected: 7036,
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
