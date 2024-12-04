import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const array = input.split("\n").map((row) => row.split(""));

  const target = "XMAS";
  let result = 0;
  const rows = array.length;
  const cols = array[0].length;

  const directions = [
    { x: 0, y: 1 }, // right
    { x: 0, y: -1 }, // left
    { x: 1, y: 0 }, // down
    { x: -1, y: 0 }, // up
    { x: 1, y: 1 }, // right down
    { x: -1, y: -1 }, // left up
    { x: 1, y: -1 }, // right up
    { x: -1, y: 1 }, // left down
  ];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (const { x, y } of directions) {
        let k;
        for (k = 0; k < target.length; k++) {
          const newRow = i + k * x;
          const newCol = j + k * y;
          if (
            newRow < 0 ||
            newRow >= rows ||
            newCol < 0 ||
            newCol >= cols ||
            array[newRow][newCol] !== target[k]
          ) {
            break;
          }
        }
        if (k === target.length) {
          result++;
        }
      }
    }
  }


  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const array = input.split("\n").map((row) => row.split(""));

  let result = 0;
  const rows = array.length;
  const cols = array[0].length;

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      if (array[i][j] === "A") {
        // Check ↖ top[row-1]-left[col-1] to ↘ bottom[row+1]-right[col+1] diagonal  
        if (
          ((array[i - 1][j - 1] === "M" && array[i + 1][j + 1] === "S") ||
            (array[i - 1][j - 1] === "S" && array[i + 1][j + 1] === "M"))
        ) {
          // Check top[row-1]-right[col+1] to bottom[row+1]-left[col-1] diagonal
          if (
            ((array[i - 1][j + 1] === "M" && array[i + 1][j - 1] === "S") ||
              (array[i - 1][j + 1] === "S" && array[i + 1][j - 1] === "M"))
          ) {
            result++;
          }
        }
      }
    }
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
