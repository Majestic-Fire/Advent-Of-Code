import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => rawInput;

const coloredString = Util.visual.coloredString;

const getNeighbors = (row, col, numRows, numCols) => {
  const neighbors = [];
  if (row > 0) neighbors.push([row - 1, col]);
  if (row < numRows - 1) neighbors.push([row + 1, col]);
  if (col > 0) neighbors.push([row, col - 1]);
  if (col < numCols - 1) neighbors.push([row, col + 1]);
  return neighbors;
};

const dfs_perimeter = (grid, row, col, visited) => {
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

    // * # of border = 4 - # of neighbors
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
        const { area, perimeter } = dfs_perimeter(grid, row, col, visited);
        totalCost += area * perimeter;
      }
    }
  }

  return totalCost;
};

class Cell {
  constructor() {
    this.corners = {
      TL: true,
      TR: true,
      BL: true,
      BR: true,
    };
  }

  turnOffCorner(corner) {
    this.corners[corner] = false;
  }

  flipCorner(corner) {
    this.corners[corner] = !this.corners[corner];
  }

  flipSideCorner(neighborPosition) {
    const cornerMap = {
      top: ['TL', 'TR'],
      bottom: ['BL', 'BR'],
      left: ['TL', 'BL'],
      right: ['TR', 'BR'],
    };

    const cornersToFlip = cornerMap[neighborPosition];
    cornersToFlip.forEach(corner => this.flipCorner(corner));
  }

  countCorners() {
    let count = 0;
    if (this.corners.TL) count++;
    if (this.corners.TR) count++;
    if (this.corners.BL) count++;
    if (this.corners.BR) count++;
    return count;
  }

  printCorner() {
    const cornerChar = (symbol, state) => state ? coloredString(symbol, "Green") : coloredString(symbol, 'Red');

    const topLeft = cornerChar('┏', this.corners.TL);
    const topRight = cornerChar('┓', this.corners.TR);
    const bottomLeft = cornerChar('┗', this.corners.BL);
    const bottomRight = cornerChar('┛', this.corners.BR);

    console.log(`${topLeft + topRight}`);
    console.log(`${bottomLeft + bottomRight}`);
  }
}

const dfs_corner = (grid, grid_cells, r, c, gridVisited) => {
  const stack = [[r, c]];
  const regionId = grid[r][c];
  let area = 0;
  let corners = 0;
  let regionVisited = new Set();

  while (stack.length > 0) {
    const [r, c] = stack.pop();
    if (gridVisited.has(`${r},${c}`)) continue;
    gridVisited.add(`${r},${c}`);
    regionVisited.add({ r, c });
    area++;

    // Check neighbors to determine which corners need to be flipped
    // top
    // Check neighbors to determine which corners need to be flipped
    if (r > 0 && grid[r - 1][c] === regionId) {
      grid_cells[r][c].flipSideCorner('top');
      // Check top-left diagonal
      if (c > 0 && grid[r - 1][c - 1] === regionId) {
        grid_cells[r][c].turnOffCorner('TL');
      }
      // Check top-right diagonal
      if (c < grid[0].length - 1 && grid[r - 1][c + 1] === regionId) {
        grid_cells[r][c].turnOffCorner('TR');
      }
    }
    if (r < grid.length - 1 && grid[r + 1][c] === regionId) {
      grid_cells[r][c].flipSideCorner('bottom');
      // Check bottom-left diagonal
      if (c > 0 && grid[r + 1][c - 1] === regionId) {
        grid_cells[r][c].turnOffCorner('BL');
      }
      // Check bottom-right diagonal
      if (c < grid[0].length - 1 && grid[r + 1][c + 1] === regionId) {
        grid_cells[r][c].turnOffCorner('BR');
      }
    }
    if (c > 0 && grid[r][c - 1] === regionId) {
      grid_cells[r][c].flipSideCorner('left');
      // Check top-left diagonal
      if (r > 0 && grid[r - 1][c - 1] === regionId) {
        grid_cells[r][c].turnOffCorner('TL');
      }
      // Check bottom-left diagonal
      if (r < grid.length - 1 && grid[r + 1][c - 1] === regionId) {
        grid_cells[r][c].turnOffCorner('BL');
      }


    }
    if (c < grid[0].length - 1 && grid[r][c + 1] === regionId) {
      grid_cells[r][c].flipSideCorner('right');
      // Check top-right diagonal
      if (r > 0 && grid[r - 1][c + 1] === regionId) {
        grid_cells[r][c].turnOffCorner('TR');
      }
      // Check bottom-right diagonal
      if (r < grid.length - 1 && grid[r + 1][c + 1] === regionId) {
        grid_cells[r][c].turnOffCorner('BR');
      }
    }

    const neighbors = getNeighbors(r, c, grid.length, grid[0].length);
    for (const [nr, nc] of neighbors) {
      if (grid[nr][nc] === regionId) {
        stack.push([nr, nc]);
      }
    }
    // console.log(`(${r},${c})`);
    // grid_cells[r][c].printCorner()

  }

  // Count the corners that are still "on"
  regionVisited.forEach(({ r, c }) => {
    corners += grid_cells[r][c].countCorners();
  });

  // console.log(`${coloredString(`>> Region ${regionId} has area ${area} and corners ${corners}`, 'Green')}\n`);

  return { area, corners };
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  console.log(input);

  const grid = input.split("\n").map((row) => row.split(""));
  const grid_cells = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => new Cell())
  );
  const visited = new Set();
  let totalCost = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (!visited.has(`${row},${col}`)) {
        const { area, corners } = dfs_corner(grid, grid_cells, row, col, visited);
        totalCost += area * corners;
      }
    }
  }

  return totalCost;
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
        expected: 1206,
      },
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 80,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
