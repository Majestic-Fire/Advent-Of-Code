import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  let ranges = rawInput.split(",").map(line => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });
  return ranges;
};

// Or more elegantly with a single regex:
const isRepeatedPatternSimple = (num) => {
  const str = num.toString();
  // Matches if string is composed of any pattern repeated 2+ times
  // ^(.+)\1+$ means: start, capture group, repeat that group 1+ more times, end
  return /^(.+)\1+$/.test(str);
};

const findInvalidIDsSum = (rangeStart, rangeEnd, allowMultipleReps = false) => {
  let sum = 0;

  for (let num = rangeStart; num <= rangeEnd; num++) {
    if (allowMultipleReps) {
      if (isRepeatedPatternSimple(num)) {
        sum += num;
      }
    } else {
      // For part 1: check if exactly doubled (length must be even)
      const str = num.toString();
      if (str.length % 2 === 0) {
        const half = str.length / 2;
        if (str.substring(0, half) === str.substring(half)) {
          sum += num;
        }
      }
    }
  }

  return sum;
};

const part1 = (rawInput) => {
  const ranges = parseInput(rawInput);
  return ranges.reduce((total, range) =>
    total + findInvalidIDsSum(range.start, range.end, false), 0
  );
};

const part2 = (rawInput) => {
  const ranges = parseInput(rawInput);
  return ranges.reduce((total, range) =>
    total + findInvalidIDsSum(range.start, range.end, true), 0
  );
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
