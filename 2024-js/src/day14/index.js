import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  return rawInput.split('\n').map(line => {
    const [positionPart, velocityPart] = line.split(' ');
    const [px, py] = positionPart.slice(2).split(',').map(Number);
    const [vx, vy] = velocityPart.slice(2).split(',').map(Number);
    return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
  });
};

class Robot {
  constructor(position, velocity) {
    this.position = position; // { x: number, y: number }
    this.velocity = velocity; // { x: number, y: number }
  }

  move(seconds = 1) {
    this.position.x += this.velocity.x * seconds;
    this.position.y += this.velocity.y * seconds;
  }
}


class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.robots = [];
  }

  addRobot(robot) {
    this.robots.push(robot);
  }

  update(seconds = 1) {
    this.robots.forEach(robot => {
      robot.move(seconds);
      this.teleport(robot);
    });
  }

  teleport(robot) {
    robot.position.x = ((robot.position.x % this.width) + this.width) % this.width;
    robot.position.y = ((robot.position.y % this.height) + this.height) % this.height;
  }


  countRobotsInQuadrants() {
    const quadrants = [0, 0, 0, 0];

    this.robots.forEach(robot => {
      const { x, y } = robot.position;
      const halfWidth = Math.floor(this.width / 2);
      const halfHeight = Math.floor(this.height / 2);

      if (x === halfWidth || y === halfHeight) return;

      if (x < halfWidth && y < halfHeight) {
        quadrants[0]++;
      } else if (x >= halfWidth && y < halfHeight) {
        quadrants[1]++;
      } else if (x < halfWidth && y >= halfHeight) {
        quadrants[2]++;
      } else {
        quadrants[3]++;
      }
    });

    // console.log(quadrants);
    return quadrants;
  }

  calculateSafetyFactor() {
    const quadrants = this.countRobotsInQuadrants();
    return quadrants.reduce((acc, val) => acc * val, 1);
  }

  findXMasTree_strat1() {
    const halfWidth = Math.floor(this.width / 2);
    const halfHeight = Math.floor(this.height / 2);
    let seconds = 0;

    while (seconds < 1_000_000) {
      this.update();
      seconds++;


      const leftHalfRobots = this.robots.filter(robot => robot.position.x < halfWidth);
      const rightHalfPositions = new Set(this.robots
        .filter(robot => robot.position.x > halfWidth)
        .map(robot => `${robot.position.x},${robot.position.y}`));

      const allFlipped = leftHalfRobots.every(robot => {
        const flippedX = halfWidth + (halfWidth - robot.position.x);
        const flippedY = robot.position.y;
        return rightHalfPositions.has(`${flippedX},${flippedY}`);
      });


      if (allFlipped) {
        console.log(`quad0: ${leftHalfRobots.length}`);
        console.log(rightHalfPositions);
        this.printGrid();
        return seconds;
      }
    }
  }

  findXMasTree_strat2() {
    let seconds = 0;

    while (seconds < 1_000_000) {
      this.update();
      seconds++;

      const firstTwoColumnsEmpty = this.robots.every(robot => robot.position.x >= 2);

      if (firstTwoColumnsEmpty) {
        console.log(`Seconds: ${seconds}`);
        this.printGrid();
        return seconds;
      }
    }
  }

  findXMasTree_start3() {
    let seconds = 0;

    while (seconds < 1_000_00) {
      this.update();
      seconds++;

      let found = true;

      for (let row = this.height - 1; row < this.height; row++) {
        const rowRobots = this.robots.filter(robot => robot.position.y === row);

        if (rowRobots.length < 3) {
          found = false;
          break;
        }

        rowRobots.forEach(robot => {
          const mirrorX = this.width - 1 - robot.position.x;
          const mirrorRobot = rowRobots.find(r => r.position.x === mirrorX);
          if (!mirrorRobot) {
            found = false;
          }
        });

        if (!found) break;
      }

      if (found) {
        console.log(`Seconds: ${seconds}`);
        this.printGrid();
        // return seconds;
      }
    }
  }

  findXMasTree() {
    let seconds = 0;

    while (seconds < 1_000_000) {
      this.update();
      seconds++;

      const positions = new Set();
      let found = true;

      for (const robot of this.robots) {
        const positionKey = `${robot.position.x},${robot.position.y}`;
        if (positions.has(positionKey)) {
          found = false;
          break;
        }
        positions.add(positionKey);
      }

      if (found) {
        console.log(`Seconds: ${seconds}`);
        this.printGrid();
        return seconds;
      }
    }
  }

  printGrid() {
    const grid = Array.from({ length: this.height }, () => Array(this.width).fill(0));

    this.robots.forEach(robot => {
      grid[robot.position.y][robot.position.x]++;
    });

    grid.forEach(row => {
      console.log(row.map(cell => (cell === 0 ? '⬛' : '⬜')).join(''));
    });
  }
}

const part1 = (rawInput) => {
  const robotList = parseInput(rawInput);

  const grid = new Grid(101, 103);
  // const grid = new Grid(11, 7);
  robotList.forEach(data => {
    const robot = new Robot(data.position, data.velocity);
    grid.addRobot(robot);
  });

  // Simulate 100 seconds
  grid.update(100);

  const result = grid.calculateSafetyFactor();
  // grid.printGrid();
  return result;
};


const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const robotList = parseInput(rawInput);

  const grid = new Grid(101, 103);
  // const grid = new Grid(11, 7);
  robotList.forEach(data => {
    const robot = new Robot(data.position, data.velocity);
    grid.addRobot(robot);
  });


  const result = grid.findXMasTree();
  return result;
};

run({
  part1: {
    tests: [
      //       {
      //         input: `p = 0, 4 v = 3, -3
      // p=6,3 v=-1,-3
      // p=10,3 v=-1,2
      // p=2,0 v=2,-1
      // p=0,0 v=1,3
      // p=3,0 v=-2,-2
      // p=7,6 v=-1,-3
      // p=3,0 v=-1,-2
      // p=9,3 v=2,3
      // p=7,3 v=-1,2
      // p=2,4 v=2,-3
      // p=9,5 v=-3,-3`,
      //         expected: 12,
      //       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      //       {
      //         input: `p=0,4 v=3,-3
      // p=6,3 v=-1,-3
      // p=10,3 v=-1,2
      // p=2,0 v=2,-1
      // p=0,0 v=1,3
      // p=3,0 v=-2,-2
      // p=7,6 v=-1,-3
      // p=3,0 v=-1,-2
      // p=9,3 v=2,3
      // p=7,3 v=-1,2
      // p=2,4 v=2,-3
      // p=9,5 v=-3,-3`,
      //         expected: 12,
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
