import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let stones = input.split(" ").map(Number);

  const Rules = {
    0: () => [1],
    evenDigits: (x) => {
      const str = x.toString();
      const mid = Math.floor(str.length / 2);
      const left = parseInt(str.slice(0, mid), 10);
      const right = parseInt(str.slice(mid), 10);
      return [left, right];
    },
    default: (x) => [x * 2024]
  };

  function applyRule(stone) {
    if (stone === 0) {
      return Rules[0]();
    } else if (stone.toString().length % 2 === 0) {
      return Rules.evenDigits(stone);
    } else {
      return Rules.default(stone);
    }
  }

  const blinkTime = 25;
  for (let i = 0; i < blinkTime; i++) {
    stones = stones.flatMap(applyRule);
  }

  let result = stones.length;

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let stones = input.split(" ").map(Number);

  const Rules = {
    0: () => [1],
    evenDigits: (x) => {
      const str = x.toString();
      const mid = Math.floor(str.length / 2);
      const left = parseInt(str.slice(0, mid), 10);
      const right = parseInt(str.slice(mid), 10);
      return [left, right];
    },
    default: (x) => [x * 2024]
  };

  function applyRule(stone) {
    if (stone === 0) {
      return Rules[0]();
    } else if (stone.toString().length % 2 === 0) {
      return Rules.evenDigits(stone);
    } else {
      return Rules.default(stone);
    }
  }

  const blinkTime = 75;
  let stoneMap = new Map();

  // Initialize the map with the initial stones
  stones.forEach(stone => {
    stoneMap.set(stone, (stoneMap.get(stone) || 0) + 1);
  });

  for (let i = 0; i < blinkTime; i++) {
    let newStoneMap = new Map();

    stoneMap.forEach((count, stone) => {
      const newStones = applyRule(stone);
      newStones.forEach(newStone => {
        newStoneMap.set(newStone, (newStoneMap.get(newStone) || 0) + count);
      });
    });

    stoneMap = newStoneMap;
  }

  let result = 0;
  stoneMap.forEach(count => {
    result += count;
  });

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `125 17`,
        expected: 65601038650482,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
