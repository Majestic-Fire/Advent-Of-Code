import run from "aocrunner";
import { gridUtil } from "../utils/index.js";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  const grid = [];
  const charMap = new Map();
  lines.forEach((line, row) => {
    const rowArr = [];

    line.split("").forEach((char, col) => {
      rowArr.push(char);

      if (char === '.') return;
      if (!charMap.has(char)) charMap.set(char, []);
      charMap.get(char).push({ row, col });
    });

    grid.push(rowArr);
  });

  const rows = grid.length;
  const cols = grid[0].length;

  for (const [char, positions] of charMap) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];
        const dr = p2.row - p1.row;
        const dc = p2.col - p1.col;

        const node1 = { row: p1.row - dr, col: p1.col - dc };
        const node2 = { row: p2.row + dr, col: p2.col + dc };

        if (!gridUtil.isOutOfRange(node1.row, node1.col, grid))
          grid[p1.row - dr][p1.col - dc] = '#';

        if (!gridUtil.isOutOfRange(node2.row, node2.col, grid))
          grid[p2.row + dr][p2.col + dc] = '#';

      }
    }
  }

  console.log("\ngrid:")
  console.log(grid.map(row => row.join("")).join("\n"));

  // Count the number of #
  let result = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === '#')
        result++;
    }
  }
  return result;
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
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
