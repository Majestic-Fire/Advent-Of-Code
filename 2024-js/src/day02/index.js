import run from "aocrunner";

function isSafe(numbers) {
  let increasing = true;

  const initialDiff = numbers[1] - numbers[0];
  // console.log("- initialDiff", initialDiff);

  // set direction
  if (initialDiff < 0) {
    increasing = false;
  }

  // check diff
  if (Math.abs(initialDiff) > 3 || Math.abs(initialDiff) < 1) {
    return false;
  }

  for (let i = 1; i < numbers.length - 1; i++) {
    const diff = numbers[i + 1] - numbers[i];

    // check direction
    if (increasing && diff < 0) {
      return false;
    }
    if (!increasing && diff > 0) {
      return false;
    }

    // check diff
    if (Math.abs(diff) > 3 || Math.abs(diff) < 1) {
      return false;
    }
  }

  return true;
}

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  let safeCount = 0;
  for (const line of lines) {
    const numbers = line.split(" ").map(Number);
    // console.log("\n", numbers);

    if (isSafe(numbers)) {
      safeCount++;
    }
  }

  return safeCount;
};

// TODO: optimize
const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  let safeCount = 0;
  for (const line of lines) {
    const numbers = line.split(" ").map(Number);
    // console.log("\n", numbers);

    if (isSafe(numbers)) {
      safeCount++;
    } else {
      // try removing one number from beginning
      // TODO: try remove 2 related unsafe numbers
      for (let i = 0; i < numbers.length; i++) {
        const newNumbers = [...numbers];
        newNumbers.splice(i, 1);

        if (isSafe(newNumbers)) {
          safeCount++;
          break;
        }
      }
    }
  }

  return safeCount;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
