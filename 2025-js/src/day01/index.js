import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  return rawInput.split("\n").map((line) => {
    const dir = line[0];
    const clicks = parseInt(line.slice(1), 10);
    return dir === 'L' ? -clicks : clicks; // L is negative, R is positive
  });
};

const part1 = (rawInput) => {
  const turns = parseInput(rawInput);
  let dial = 50;
  let password = 0;

  for (const turn of turns) {
    dial = ((dial + turn) % 100 + 100) % 100;
    if (dial === 0) password++;
  }

  return password;
};

const part2 = (rawInput) => {
  const turns = parseInput(rawInput);
  let dial = 50;
  let password = 0;

  for (const turn of turns) {
    if (turn < 0) {
      const fullRotations = Math.floor(turn / -100);
      const remaining = turn % -100;
      password += fullRotations;
      if (dial !== 0 && dial + remaining <= 0) password++;
    } else {
      const fullRotations = Math.floor(turn / 100);
      const remaining = turn % 100;
      password += fullRotations;
      if (dial + remaining >= 100) password++;
    }

    dial = ((dial + turn) % 100 + 100) % 100;
  }

  return password;
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
