import run from "aocrunner";
import { grid } from '../utils/index.js';

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const maze = input.split("\n").map((line) => line.split(""));

  const directions = [
    { dr: -1, dc: 0 }, // up
    { dr: 0, dc: 1 },  // right
    { dr: 1, dc: 0 },  // down
    { dr: 0, dc: -1 }  // left
  ];

  const facingMap = {
    '^': 0, // up
    '>': 1, // right
    'v': 2, // down
    '<': 3  // left
  };

  let start = { r: -1, c: -1, facing: -1 };


  // find start with facing ^ > v < 
  for (let r = 0; r < maze.length; r++) {
    for (let c = 0; c < maze[r].length; c++) {
      if (facingMap.hasOwnProperty(maze[r][c])) {
        start = {
          r: r,
          c: c,
          facing: facingMap[maze[r][c]]
        };
        break;
      }
    }
    if (start.r !== -1) break; // Exit the outer loop if start is found
  }

  let result = 0;
  while (true) {
    // check if now outside
    if (grid.isOutOfRange(start.r, start.c, maze))
      break;

    const { dr, dc } = directions[start.facing];
    const nr = start.r + dr;
    const nc = start.c + dc;

    // check if wall in front > rotate
    if (!grid.isOutOfRange(nr, nc, maze) && maze[nr][nc] === '#') {
      start.facing = (start.facing + 1) % 4;
    } else {
      // TODO: move until hit wall
      if (maze[start.r][start.c] !== 'X') {
        result++;
      }
      // leave a mark X
      maze[start.r][start.c] = 'X';
      // move forward
      start.r = nr;
      start.c = nc;
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
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
