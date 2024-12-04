import run from "aocrunner";

const parseInput = (rawInput) => {
  return rawInput.split("\n");
};

const part1 = (rawInput) => {
  const lines = parseInput(rawInput);

  const left = [];
  const right = [];

  for (const line of lines) {
    const [l, r] = line.split("   ").map(Number);
    left.push(l);
    right.push(r);
  }

  // Sorting is not necessary if we use a two-pointer technique
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
};

const part2 = (rawInput) => {
  const lines = parseInput(rawInput);

  const left = {};
  const right = {};

  for (const line of lines) {
    const [l, r] = line.split("   ").map(Number);

    // Count occurrences in the left list
    left[l] = (left[l] || 0) + 1;

    // Count occurrences in the right list
    right[r] = (right[r] || 0) + 1;
  }

  let score = 0;

  for (const key in left) {
    if (right[key]) {
      score += Number(key) * right[key] * left[key];
    }
  }

  return score;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
