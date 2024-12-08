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

  // Start to find the unique anitnode by antenna(charMap)
  const rows = grid.length;
  const cols = grid[0].length;
  const uniqueNode = new Set();

  for (const [char, positions] of charMap) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];
        const dr = p2.row - p1.row;
        const dc = p2.col - p1.col;

        const node1 = { row: p1.row - dr, col: p1.col - dc };
        const node2 = { row: p2.row + dr, col: p2.col + dc };

        if (!gridUtil.isOutOfRange(node1.row, node1.col, grid)) {
          grid[node1.row][node1.col] = '#';
          uniqueNode.add(`${node1.row},${node1.col}`);
        }

        if (!gridUtil.isOutOfRange(node2.row, node2.col, grid)) {
          grid[node2.row][node2.col] = '#';
          uniqueNode.add(`${node2.row},${node2.col}`);
        }
      }
    }
  }

  // Visualize 
  console.log("\ngrid:")
  console.log(grid.map(row => row.join("")).join("\n"));
  console.log(uniqueNode);

  // Count the number of #
  let result = uniqueNode.size;

  return result;
};

const part2 = (rawInput) => {
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

  // Start to find the unique anitnode by antenna(charMap)
  const rows = grid.length;
  const cols = grid[0].length;
  const uniqueNode = new Set();

  for (const [char, positions] of charMap) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];
        const dr = p2.row - p1.row;
        const dc = p2.col - p1.col;

        let k = 0;
        while (true) {

          const node1 = { row: p1.row - k * dr, col: p1.col - k * dc };
          if (gridUtil.isOutOfRange(node1.row, node1.col, grid)) {
            break;
          }
          grid[node1.row][node1.col] = '#';
          uniqueNode.add(`${node1.row},${node1.col}`);
          k++
        }

        k = 0;
        while (true) {

          const node2 = { row: p2.row + k * dr, col: p2.col + k * dc };
          if (gridUtil.isOutOfRange(node2.row, node2.col, grid)) {
            break;
          }
          grid[node2.row][node2.col] = '#';
          uniqueNode.add(`${node2.row},${node2.col}`);
          k++
        }


      }
    }
  }

  // Visualize 
  console.log("\ngrid:")
  console.log(grid.map(row => row.join("")).join("\n"));
  console.log(uniqueNode);

  // Count the number of #
  let result = uniqueNode.size;

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
        expected: 34,
      },
      {
        input: `T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
