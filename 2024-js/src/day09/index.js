import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const numbers = input.split("").map(Number);

  let disk = [];
  numbers.forEach((num, idx) => {
    if (num === 0) return; // Skip if num is 0

    if (idx % 2 === 0) {

      disk.push(...Array(num).fill((idx / 2)));
    } else {
      disk.push(...Array(num).fill("."));
    }
  });

  // Replace '.' with the last element
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === ".") {
      let lastElement = disk.pop();
      while (lastElement === ".") {
        lastElement = disk.pop();
      }
      disk[i] = lastElement;

    }
  }

  let result = 0;

  // const diskStr = disk.join("");
  // for (let pos = 0; pos < diskStr.length; pos++) {
  // result += parseInt(diskStr[pos]) * pos;
  // }

  for (let pos = 0; pos < disk.length; pos++) {
    result += disk[pos] * pos;
    // console.log(disk[pos], pos, disk[pos] * pos);
  }

  return result;
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
        input: `2333133121414131402`,
        expected: 1928,
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
