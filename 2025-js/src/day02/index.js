import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  let ranges = rawInput.split(",").map(line => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });
  return ranges;
};

const findInvalidIDsRecursive = (rangeStart, rangeEnd, patternLength = 1, foundIDs = new Set()) => {
  // For patternLength=1: patterns are 1-9
  // For patternLength=2: patterns are 10-99
  // For patternLength=3: patterns are 100-999
  const smallestPattern = Math.pow(10, patternLength - 1);
  const largestPattern = Math.pow(10, patternLength) - 1;

  // When we double a pattern, we're effectively multiplying by (10^length + 1)
  // Example: pattern 5 with length 1 -> 5 * 11 = 55
  // Example: pattern 64 with length 2 -> 64 * 101 = 6464
  const doubleMultiplier = Math.pow(10, patternLength) + 1;

  // Calculate which patterns could produce IDs in our range
  // If rangeStart=50, we need pattern >= ceil(50/11) = 5 for length 1
  const firstPatternInRange = Math.max(
    smallestPattern,
    Math.ceil(rangeStart / doubleMultiplier)
  );

  // If rangeEnd=80, we need pattern <= floor(80/11) = 7 for length 1
  const lastPatternInRange = Math.min(
    largestPattern,
    Math.floor(rangeEnd / doubleMultiplier)
  );

  // Generate all invalid IDs for this pattern length
  for (let pattern = firstPatternInRange; pattern <= lastPatternInRange; pattern++) {
    const doubledID = pattern * doubleMultiplier;
    foundIDs.add(doubledID);
  }

  // Check if we should try longer patterns
  // Example: for length 1, next minimum is 1010 (10 doubled)
  const nextLengthMinimum = Math.pow(10, patternLength) * (Math.pow(10, patternLength) + 1);

  if (nextLengthMinimum <= rangeEnd) {
    findInvalidIDsRecursive(rangeStart, rangeEnd, patternLength + 1, foundIDs);
  }

  return foundIDs;
};

const part1 = (rawInput) => {
  const ranges = parseInput(rawInput);

  let totalSum = 0;

  for (const range of ranges) {
    const invalidIDs = findInvalidIDsRecursive(range.start, range.end);
    for (const id of invalidIDs) {
      totalSum += id;
    }
  }

  return totalSum;
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
