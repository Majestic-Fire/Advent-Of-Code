import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  let banks = rawInput.split("\n");
  // console.log(banks[1]);
  return banks;
};

const part1 = (rawInput) => {
  const banks = parseInput(rawInput);

  let totalJoltage = 0;

  for (const bank of banks) {
    const digits = bank.split('').map(Number);

    // Find the largest digit (tens place)
    const tens = Math.max(...digits.slice(0, -1));

    // Find the largest digit after the first largest (ones place)
    const ones = Math.max(...digits.slice(digits.indexOf(tens) + 1));

    // Calculate the joltage
    totalJoltage += tens * 10 + ones;
  }

  return totalJoltage;
};

const part2 = (rawInput) => {
  const banks = parseInput(rawInput);

  let totalJoltage = 0;

  for (const bank of banks) {
    const n = bank.length;
    const pointers = Array.from({ length: 12 }, (_, i) => n - 12 + i); // Initialize 12 pointers at the last 12 positions

    // For each pointer, move backward to find the farthest largest digit
    for (let p = 0; p < 12; p++) {
      const currentDigit = bank[pointers[p]];
      let maxDigit = currentDigit;
      let maxIdx = pointers[p];

      // Move backward from current pointer position to the start
      const searchStart = p === 0 ? 0 : pointers[p - 1] + 1;
      for (let i = pointers[p] - 1; i >= searchStart; i--) {
        if (bank[i] >= maxDigit) { // Use >= to get the farthest
          maxDigit = bank[i];
          maxIdx = i;
        }
      }

      pointers[p] = maxIdx; // Update pointer to the farthest largest digit
    }

    // Build the joltage from the selected digits
    const joltage = pointers.map(idx => bank[idx]).join('');
    totalJoltage += parseInt(joltage);
  }

  return totalJoltage;
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
