import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  const [map, movements] = rawInput.split('\n\n');
  const grid = map.split('\n').map(line => line.split(''));
  const instructions = movements.replace(/\n/g, '');
  return { grid, instructions };
};

const part1 = (rawInput) => {
  const { grid, instructions } = parseInput(rawInput);

  // Find the initial position of the robot
  let robotPosition = { r: 0, c: 0 };
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '@') {
        robotPosition = { r: i, c: j };
        break;
      }
    }
  }

  const moveRobot = (direction) => {
    const { r, c } = robotPosition;
    let newR = r, newC = c;

    if (direction === '^') newR--;
    if (direction === 'v') newR++;
    if (direction === '<') newC--;
    if (direction === '>') newC++;

    // Check if the new position is a wall
    if (grid[newR][newC] === '#') return;

    // Check if the new position is a box
    if (grid[newR][newC] === 'O') {
      let boxNewR = newR, boxNewC = newC;
      let canMove = false;

      // Check all boxes in the direction
      while (grid[boxNewR][boxNewC] === 'O') {
        if (direction === '^') boxNewR--;
        if (direction === 'v') boxNewR++;
        if (direction === '<') boxNewC--;
        if (direction === '>') boxNewC++;

        // If the next position is a space, the box can be moved
        if (grid[boxNewR][boxNewC] === '.') {
          canMove = true;
          break;
        }

        if (grid[boxNewR][boxNewC] === '#') {
          canMove = false;
          break;
        }
      }

      // If all boxes can be moved, move them
      if (canMove) {
        grid[newR][newC] = '.';
        grid[boxNewR][boxNewC] = 'O';
      } else {
        return;
      }
    };

    // Move the robot
    grid[r][c] = '.';
    grid[newR][newC] = '@';
    robotPosition = { r: newR, c: newC };
  };

  // console.log("\nInitial State:");
  // console.log(grid.map(line => line.join('')).join('\n'));
  // Process each instruction
  for (const instruction of instructions) {
    moveRobot(instruction);

    // console.log("\nmove:", instruction);
    // console.log(grid.map(line => line.join('')).join('\n'));
  }


  // Calculate the sum of all boxes' GPS coordinates
  let gpsSum = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'O') {
        gpsSum += 100 * i + j;
      }
    }
  }

  return gpsSum;
};


const transformMap = (originalMap) => {
  const newMap = [];

  for (let i = 0; i < originalMap.length; i++) {
    let newRow = '';
    for (let j = 0; j < originalMap[i].length; j++) {
      const tile = originalMap[i][j];
      if (tile === '#') {
        newRow += '##';
      } else if (tile === 'O') {
        newRow += '[]';
      } else if (tile === '.') {
        newRow += '..';
      } else if (tile === '@') {
        newRow += '@.';
      }
    }
    newRow = newRow.split('');
    newMap.push(newRow);
  }

  return newMap;
};

const part2 = (rawInput) => {
  const { grid, instructions } = parseInput(rawInput);

  // Transform the original map to the wider map
  let tGrid = transformMap(grid);

  // Find the initial position of the robot
  let robotPosition = { r: 0, c: 0 };
  for (let i = 0; i < tGrid.length; i++) {
    for (let j = 0; j < tGrid[i].length; j++) {
      if (tGrid[i][j] === '@') {
        robotPosition = { r: i, c: j };
        break;
      }
    }
  }

  const moveRobot = (direction) => {
    const { r, c } = robotPosition;
    let newR = r, newC = c;

    if (direction === '^') newR--;
    if (direction === 'v') newR++;
    if (direction === '<') newC--;
    if (direction === '>') newC++;

    // Check if the new position is a wall
    if (tGrid[newR][newC] === '#') return;

    // Check if the new position is a box
    if (tGrid[newR][newC] === '[' || tGrid[newR][newC] === ']') {
      let boxNewR = newR, boxNewC = newC;
      let canMove = false;

      // Check all boxes in the direction
      while (tGrid[boxNewR][boxNewC] === '[' || tGrid[boxNewR][boxNewC] === ']') {
        if (direction === '^') boxNewR--;
        if (direction === 'v') boxNewR++;
        if (direction === '<') boxNewC--;
        if (direction === '>') boxNewC++;

        // If the next position is a space, the box can be moved
        if (tGrid[boxNewR][boxNewC] === '.') {
          canMove = true;
          break;
        }

        if (tGrid[boxNewR][boxNewC] === '#') {
          canMove = false;
          break;
        }
      }

      // If all boxes can be moved, move them
      if (canMove) {
        boxNewR = newR;
        boxNewC = newC;
        let first = tGrid[newR][newC];
        let second;
        while (
          tGrid[boxNewR][boxNewC] === '[' ||
          tGrid[boxNewR][boxNewC] === ']'
        ) {
          if (direction === '^') boxNewR--;
          if (direction === 'v') boxNewR++;
          if (direction === '<') boxNewC--;
          if (direction === '>') boxNewC++;

          second = tGrid[boxNewR][boxNewC];

          console.log(first, second);

          tGrid[boxNewR][boxNewC] = first;
          first = second;
        }
      } else {
        return;
      }
    };

    // Move the robot
    tGrid[r][c] = '.';
    tGrid[newR][newC] = '@';
    robotPosition = { r: newR, c: newC };
  };


  console.log("\nInitial State:");
  console.log(tGrid.map(line => line.join('')).join('\n'));

  // Process each instruction
  for (const instruction of instructions) {
    moveRobot(instruction);

    console.log("\nmove:", instruction);
    console.log(tGrid.map(line => line.join('')).join('\n'));
  }


  // Calculate the sum of all boxes' GPS coordinates
  let gpsSum = 0;
  for (let i = 0; i < tGrid.length; i++) {
    for (let j = 0; j < tGrid[i].length; j++) {
      if (tGrid[i][j] === '[') {
        gpsSum += 100 * i + j;
      }
    }
  }

  return gpsSum;
};

run({
  part1: {
    tests: [
      //       {
      //         input: `##########
      // #..O..O.O#
      // #......O.#
      // #.OO..O.O#
      // #..O@..O.#
      // #O#..O...#
      // #O..O..O.#
      // #.OO.O.OO#
      // #....O...#
      // ##########

      // <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
      // vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
      // ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
      // <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
      // ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
      // ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
      // >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
      // <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
      // ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
      // v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
      //         expected: 10092,
      // },
      {
        input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`,
        expected: 2028,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<vv<<^^<<^^`,
        expected: 2028,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
