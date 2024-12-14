import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  const machines = rawInput.trim().split("\n\n").map(machine => {
    const lines = machine.split("\n");
    const buttonA = lines[0].match(/X\+(\d+), Y\+(\d+)/).slice(1).map(Number);
    const buttonB = lines[1].match(/X\+(\d+), Y\+(\d+)/).slice(1).map(Number);
    const prize = lines[2].match(/X=(\d+), Y=(\d+)/).slice(1).map(Number);

    return { buttonA, buttonB, prize };
  });
  return machines;
};

const findMinTokens_bruteForce = (buttonA, buttonB, prize) => {
  const [ax, ay] = buttonA;
  const [bx, by] = buttonB;
  const [px, py] = prize;

  let minTokens = Infinity;

  for (let a = 0; a <= 100; a++) {
    for (let b = 0; b <= 100; b++) {
      if (a * ax + b * bx === px && a * ay + b * by === py) {
        const tokens = a * 3 + b * 1;
        if (tokens < minTokens) {
          minTokens = tokens;
        }
      }
    }
  }

  return minTokens === Infinity ? null : minTokens;
};

const findMinTokens_cramerRule = (buttonA, buttonB, prize, maxPress = Infinity) => {
  const [ax, ay] = buttonA;
  const [bx, by] = buttonB;
  const [px, py] = prize;

  // Set up the system of equations
  // ax * x + bx * y = px
  // ay * x + by * y = py

  // Calculate the determinant
  const det = ax * by - ay * bx;

  if (det === 0) {
    // No unique solution exists
    return null;
  }

  const detA = px * by - py * bx;
  const detB = ax * py - ay * px;


  // Calculate the solution
  const a = detA / det;
  const b = detB / det;

  // Check if a and b are integers
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    return null;
  }

  if (a > maxPress || b > maxPress) {
    return null;
  }

  // Return the tokens 
  const tokens = a * 3 + b * 1;
  // console.log(`a: ${a}, b: ${b}, tokens: ${tokens}`);
  return tokens;
};

const part1 = (rawInput) => {
  const machines = parseInput(rawInput);

  let totalTokens = 0;
  let prizesWon = 0;

  machines.forEach(({ buttonA, buttonB, prize }) => {
    const tokens = findMinTokens_cramerRule(buttonA, buttonB, prize, 100);
    if (tokens !== null) {
      totalTokens += tokens;
      prizesWon++;
    }
  });

  return totalTokens;
};

const part2 = (rawInput) => {
  const machines = parseInput(rawInput);
  machines.forEach(({ prize }) => {
    prize[0] += 10_000_000_000_000;
    prize[1] += 10_000_000_000_000;
  });

  let totalTokens = 0;
  let prizesWon = 0;

  machines.forEach(({ buttonA, buttonB, prize }) => {
    const tokens = findMinTokens_cramerRule(buttonA, buttonB, prize);
    if (tokens !== null) {
      totalTokens += tokens;
      prizesWon++;
    }
  });

  return totalTokens;
};

run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 480,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 875318608908,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
