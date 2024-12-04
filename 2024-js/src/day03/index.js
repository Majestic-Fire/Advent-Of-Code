import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const regex = /mul\(\d+,\d+\)/g;
  const matches = input.match(regex);
  console.log("matches", matches);

  let result = 0;
  for (const match of matches) {
    const [a, b] = match.slice(4, -1).split(",").map(Number);
    result += a * b;
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  // const regexDo = /do\(\)/g;
  // const regexDont = /don't\(\)/g;
  // const regexMul = /mul\(\d+,\d+\)/g;

  const regexDo_Dont_Mul = /do\(\)|don't\(\)|mul\(\d+,\d+\)/g;
  const matchesDo_Dont_Mul = input.match(regexDo_Dont_Mul);
  console.log("matchesDo_Dont_Mul", matchesDo_Dont_Mul);

  let isDo = true;
  let result = 0;

  for (const match of input.match(regexDo_Dont_Mul) || []) {
    if (match === "do()") {
      isDo = true;
    } else if (match === "don't()") {
      isDo = false;
    } else if (isDo && match.startsWith("mul")) {
      const [a, b] = match.slice(4, -1).split(",").map(Number);
      result += a * b;
    }
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
