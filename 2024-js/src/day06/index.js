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

  let guard = { r: -1, c: -1, facing: -1 };

  // find guard with facing ^ > v < 
  for (let r = 0; r < maze.length; r++) {
    for (let c = 0; c < maze[r].length; c++) {
      if (maze[r][c] === '^') {
        guard = {
          r: r,
          c: c,
          facing: 0
        };
        break;
      }
    }
    if (guard.r !== -1) break; // Exit the outer loop if guard is found
  }

  let result = 0;
  while (!grid.isOutOfRange(guard.r, guard.c, maze)) {
    // leave a mark
    if (maze[guard.r][guard.c] !== 'X') {
      maze[guard.r][guard.c] = 'X';
      result++;
    }

    const { dr, dc } = directions[guard.facing];
    const nr = guard.r + dr;
    const nc = guard.c + dc;

    if (grid.isOutOfRange(nr, nc, maze))
      break;

    // rotate if next step is wall
    if (maze[nr][nc] === '#') {
      guard.facing = (guard.facing + 1) % 4;
    } else {
      // move forward
      guard.r = nr;
      guard.c = nc;
    }

  }

  return result;
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const maze = input.split("\n").map((line) => line.split(""));

  const directions = [
    { dr: -1, dc: 0 }, // up
    { dr: 0, dc: 1 },  // right
    { dr: 1, dc: 0 },  // down
    { dr: 0, dc: -1 }  // left
  ];

  let guard = { r: -1, c: -1, facing: -1 };

  // find guard with facing ^ > v < 
  for (let r = 0; r < maze.length; r++) {
    for (let c = 0; c < maze[r].length; c++) {
      if (maze[r][c] === '^') {
        guard = {
          r: r,
          c: c,
          facing: 0
        };
        break;
      }
    }
    if (guard.r !== -1) break; // Exit the outer loop if guard is found
  }

  const isLoop = (tmp_maze, tmp_guard) => {
    let visistedGrid_vector = new Set();

    while (true) {
      visistedGrid_vector.add(`${tmp_guard.r},${tmp_guard.c},${tmp_guard.facing}`);

      const { dr, dc } = directions[tmp_guard.facing];
      const nr = tmp_guard.r + dr;
      const nc = tmp_guard.c + dc;

      if (grid.isOutOfRange(nr, nc, tmp_maze))
        return false; // can escape, not in loop

      // rotate if next step is wall
      if (tmp_maze[nr][nc] === '#') {
        tmp_guard.facing = (tmp_guard.facing + 1) % 4;
      } else {
        // move forward
        tmp_guard.r = nr;
        tmp_guard.c = nc;
      }

      // if in loop, as walking the grid with same direction
      if (visistedGrid_vector.has(`${tmp_guard.r},${tmp_guard.c},${tmp_guard.facing}`)) {
        return true;
      }
    }
  }

  const guard_path = (maze, guard) => {
    let visistedGrid = new Set();

    while (true) {
      visistedGrid.add(`${guard.r},${guard.c}`);

      const { dr, dc } = directions[guard.facing];
      const nr = guard.r + dr;
      const nc = guard.c + dc;

      if (grid.isOutOfRange(nr, nc, maze))
        break; // can escape, not in loop

      // rotate if next step is wall
      if (maze[nr][nc] === '#') {
        guard.facing = (guard.facing + 1) % 4;
      } else {
        // move forward
        guard.r = nr;
        guard.c = nc;
      }
    }

    return visistedGrid;
  };

  let result = 0;
  guard_path(maze, { ...guard }).forEach((v) => {
    const [r, c] = v.split(',').map(Number);
    maze[r][c] = '#'; // place wall
    if (isLoop(maze, { ...guard }))
      result++;

    maze[r][c] = '.'; // reset path

  });


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
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
