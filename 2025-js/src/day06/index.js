import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  const lines = rawInput.split("\n");

  const operatorLine = lines[lines.length - 1];
  const operandLines = lines.slice(0, -1);

  // Find operator positions
  const operators = [];
  const operatorPositions = [];

  for (let i = 0; i < operatorLine.length; i++) {
    if (operatorLine[i] !== ' ') {
      operators.push(operatorLine[i]);
      operatorPositions.push(i);
    }
  }

  const operandsStr = [];
  const operands = [];

  for (let i = 0; i < operatorPositions.length; i++) {
    const start = operatorPositions[i];
    const nextPos = i < operatorPositions.length - 1 ? operatorPositions[i + 1] : operatorLine.length;
    const width = nextPos - start;

    const colStr = operandLines.map(line => line.substring(start, start + width));
    const colNums = colStr.map(s => Number(s.replace(/\s/g, '')));

    operandsStr.push(colStr);
    operands.push(colNums);
  }

  // console.log({ operators, operandsStr, operands });

  return { operands, operandsStr, operators };
};

const part1 = (rawInput) => {
  const { operands, operators } = parseInput(rawInput);

  let result = 0;

  operators.forEach((op, index) => {
    const nums = operands[index];

    if (op === '+') {
      result += nums.reduce((sum, num) => sum + num, 0);
    } else if (op === '*') {
      result += nums.reduce((prod, num) => prod * num, 1);
    }
  });

  return result;
};

const part2 = (rawInput) => {
  const { operandsStr, operators } = parseInput(rawInput);

  let result = 0;

  operators.forEach((op, colIndex) => {
    const column = operandsStr[colIndex];

    // Read right-to-left, combine digits top-to-bottom
    const numbers = [];
    const maxLen = Math.max(...column.map(s => s.length));

    for (let digitPos = maxLen - 1; digitPos >= 0; digitPos--) {
      const numStr = column
        .map(row => row[digitPos])
        .filter(char => char && char !== ' ')
        .join('');

      if (numStr) numbers.push(Number(numStr));
    }

    // Apply operator
    if (op === '+') {
      result += numbers.reduce((sum, n) => sum + n, 0);
    } else if (op === '*') {
      result += numbers.reduce((prod, n) => prod * n, 1);
    }
  });

  return result;
};

run({
  part1: {
    tests: [
      {
        input: ``,
        expected: "",
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
