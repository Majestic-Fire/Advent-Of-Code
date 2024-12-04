import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");
  const left = [];
  const right = [];

  for (const line of lines) {
    const [l, r] = line.split("   ").map(Number); 
    left.push(l);
    right.push(r);  
  }

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);


  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");
  const left = {};
  const right = {};

  for (const line of lines) {
    const [l, r] = line.split("   ").map(Number);
  
    // Count occurrences in the left list
    if (left[l]) {
      left[l]++;
    } else {
      left[l] = 1;
    }
  
    // Count occurrences in the right list
    if (right[r]) {
      right[r]++;
    } else {
      right[r] = 1;
    }
  }
  
  let score = 0;

  for (const key in left) {
    if (right[key]) {
      score += Number.parseInt(key) * right[key] * left[key];
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
  onlyTests: false,
});
