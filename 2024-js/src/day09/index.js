import run from "aocrunner";
import * as Util from "../utils/index.js";

// Visualization with colors
const color = {
  Reset: "\x1b[0m",
  Red: "\x1b[31m",
  Green: "\x1b[32m",
  Yellow: "\x1b[33m",
  Blue: "\x1b[34m",
  Magenta: "\x1b[35m",
  Cyan: "\x1b[36m",
}

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const numbers = input.split("").map(Number);

  let disk = [];
  let currId = 0;
  let isFile = true;

  numbers.forEach((num) => {
    if (isFile) {
      disk.push(...Array(num).fill(currId));
      currId++;
    }
    else {
      disk.push(...Array(num).fill(-1));
    }

    isFile = !isFile;
  });

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === -1) {
      let lastElement = disk.pop();
      disk[i] = lastElement;

      // remove trailing -1s
      while (disk[disk.length - 1] === -1) {
        disk.pop();
      }
    }
  }

  console.log(disk.slice(50000, 52000));

  let result = 0;
  for (let i = 0; i < disk.length; i++) {
    result += disk[i] * i;
  }

  return result;
};

const part1_2ptrs = (rawInput) => {
  const input = parseInput(rawInput);
  const numbers = input.split("").map(Number);

  const isVisualize = false;

  let currId = 0;
  let lastId = Math.ceil(numbers.length / 2) - 1;
  let isFile = true;

  let result = 0;
  let left = 0;
  let right = numbers.length - 1;
  let pos = 0;

  if (isVisualize) {
    const coloredNumbers = numbers.map((num, idx) => {
      return idx % 2 === 0 ? `${color.Green}${num}${color.Reset}` : `${color.Red}${num}${color.Reset}`;
    }).join(" ");
    console.log(coloredNumbers, "\t", result);
    console.log(" ".repeat(left * 2) + "L", `${" ".repeat(Math.max((right - left - 1) * 2, 0))}R`);
    console.log("-".repeat(38));
  }

  while (left < right) {
    if (numbers[left] === 0) {
      if (isFile) currId++;
      left++;
    }

    if (numbers[right] === 0) {
      lastId--;
      right -= 2; // go to next file, skip the space
    }

    if (isVisualize) {
      console.log("left:", left, "right:", right, "isFile:", isFile);
    }

    if (isFile) {

      const endPos = pos + numbers[left] - 1;
      const sumOfPos = (pos + endPos) * numbers[left] / 2;
      result += currId * sumOfPos;

      // visualize use
      if (isVisualize) {
        const positions = Array.from({ length: endPos - pos + 1 }, (v, i) => (pos + i));
        console.log(`${color.Cyan}Eqn: ${currId} * (${positions.join(",")}) = ${currId * sumOfPos}${color.Reset}`);
        console.log(`${color.Green}File[id-${currId}] Count: ${numbers[left]} at ${left}${color.Reset}`);
      }

      pos = endPos + 1; // update next pos
      isFile = !isFile;
      numbers[left] = 0;
    } else {
      // numbers[left] is space now;
      // numbers[right] is file;
      const moveable = Math.min(numbers[left], numbers[right]);

      const endPos = pos + moveable - 1;
      const sumOfPos = (pos + endPos) * moveable / 2;
      result += lastId * sumOfPos;


      // visualize use
      if (isVisualize) {
        const positions = Array.from({ length: endPos - pos + 1 }, (v, i) => (pos + i));
        console.log(`${color.Cyan}Eqn: ${lastId} * (${positions.join(",")}) = ${lastId * sumOfPos}${color.Reset}`);
        console.log(`${color.Red}Space Used: ${moveable} at ${left}${color.Reset}, ${color.Green}File[id-${lastId}] Count: ${moveable} at ${right}${color.Reset}`);
      }

      pos = endPos + 1; // update next pos

      const enoughSpace = numbers[left] > numbers[right];
      if (enoughSpace) {
        numbers[left] -= numbers[right];
        numbers[right] = 0;
      } else {
        numbers[right] -= numbers[left];
        numbers[left] = 0;
        isFile = !isFile; // space is used up (left side)
      }

    }

    if (isVisualize) {
      const coloredNumbers = numbers.map((num, idx) => {
        return idx % 2 === 0 ? `${color.Green}${num}${color.Reset}` : `${color.Red}${num}${color.Reset}`;
      }).join(" ");
      console.log(coloredNumbers, "\t", result);
      if (left < right) {
        console.log(" ".repeat(left * 2) + "L", `${" ".repeat(Math.max((right - left - 1) * 2, 0))}R`);
      } else {
        if (left === right)
          console.log(" ".repeat(left * 2) + "*");
        else
          console.log(" ".repeat(right * 2) + "R", " ".repeat(Math.max((left - right - 1) * 2 - 1, 1)), "L");
      }
      console.log("-".repeat(38));
    }
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const numbers = input.split("").map(Number);

  let isVisualize = 5;

  let currId = 0;
  let lastId = Math.ceil(numbers.length / 2) - 1;
  let isFile = true;

  let result = 0;
  let left = 0;
  let right = numbers.length - 1;
  let pos = 0;

  if (isVisualize) {
    const coloredNumbers = numbers.map((num, idx) => {
      return idx % 2 === 0 ? `${color.Green}${num}${color.Reset}` : `${color.Red}${num}${color.Reset}`;
    }).join(" ");
    console.log(coloredNumbers, "\t", result);
    console.log(" ".repeat(left * 2) + "L", `${" ".repeat(Math.max((right - left - 1) * 2, 0))}R`);
    console.log("-".repeat(38));
  }

  while (left < right) {
    if (numbers[left] === 0) {
      if (isFile) currId++;
      left++;
    }

    if (numbers[right] === 0) {
      lastId--;
      right -= 2; // go to next file, skip the space
    }

    if (isVisualize) {
      console.log("left:", left, "last_right:", right, "isFile:", isFile);
    }

    if (isFile) {

      const endPos = pos + numbers[left] - 1;
      const sumOfPos = (pos + endPos) * numbers[left] / 2;
      result += currId * sumOfPos;

      // visualize use
      if (isVisualize) {
        const positions = Array.from({ length: endPos - pos + 1 }, (v, i) => (pos + i));
        console.log(`${color.Cyan}Eqn: ${currId} * (${positions.join(",")}) = ${currId * sumOfPos}${color.Reset}`);
        console.log(`${color.Green}File[id-${currId}] Count: ${numbers[left]} at ${left}${color.Reset}`);
      }

      pos = endPos + 1; // update next pos
      isFile = false;
      numbers[left] = 0;
    } else {
      // numbers[left] is space now;
      // !numbers[right] is file;

      let r = right;
      let r_id = lastId;
      let enoughSpace = numbers[left] >= numbers[r];

      while (r > left && !enoughSpace) {
        r -= 2;
        r_id--;
        if (numbers[r] > 0) {
          enoughSpace = numbers[left] >= numbers[r];
        }
        if (isVisualize) {
          if (left < right) {
            console.log(" ".repeat(left * 2) + "L", `${" ".repeat(Math.max((r - left - 1) * 2, 0))}v`);
          } else {
            if (left === right)
              console.log(" ".repeat(left * 2) + "*");
            else
              console.log(" ".repeat(right * 2) + "v", " ".repeat(Math.max((left - r - 1) * 2 - 1, 1)), "L");
          }
        }
      }
      const coloredNumbers = numbers.map((num, idx) => {
        return idx % 2 === 0 ? `${color.Green}${num}${color.Reset}` : `${color.Red}${num}${color.Reset}`;
      }).join(" ");
      console.log(coloredNumbers, "\t", result);
      console.log("-");

      // no file found to fill the space
      if (r < left) {
        pos += numbers[left];
        left++;
        currId++;
        isFile = true;
        if (isVisualize) {
          console.log("No file found to fill the space");
          console.log("-".repeat(38));
        }
        continue;
      }

      const moveable = numbers[r];

      const endPos = pos + moveable - 1;
      const sumOfPos = (pos + endPos) * moveable / 2;
      result += r_id * sumOfPos;

      if (enoughSpace) {
        numbers[left] -= numbers[r];
        numbers[r - 1] += numbers[r];
        numbers[r] = 0;
      }
      if (numbers[left] === 0) {
        isFile = true
      }

      // visualize use
      if (isVisualize) {
        console.log(`${color.Magenta}Enough Space:`, enoughSpace);
        const positions = Array.from({ length: endPos - pos + 1 }, (v, i) => (pos + i));
        console.log(`${color.Cyan}Eqn: ${r_id} * (${positions.join(",")}) = ${r_id * sumOfPos}${color.Reset}`);
        console.log(`${color.Red}Space Used: ${moveable} at ${left}${color.Reset}, ${color.Green}File[id-${r_id}] Count: ${moveable} at ${right}${color.Reset}`);

        if (left < right) {
          console.log(" ".repeat(left * 2) + "L", `${" ".repeat(Math.max((r - left - 1) * 2, 0))}v`);
        } else {
          if (left === right)
            console.log(" ".repeat(left * 2) + "*");
          else
            console.log(" ".repeat(right * 2) + "v", " ".repeat(Math.max((left - r - 1) * 2 - 1, 1)), "L");
        }
      }

      pos = endPos + 1; // update next pos
    }

    if (isVisualize) {
      const coloredNumbers = numbers.map((num, idx) => {
        return idx % 2 === 0 ? `${color.Green}${num}${color.Reset}` : `${color.Red}${num}${color.Reset}`;
      }).join(" ");
      console.log(coloredNumbers, "\t", result);
      if (left < right) {
        console.log(" ".repeat(left * 2) + "L", `${" ".repeat(Math.max((right - left - 1) * 2, 0))}R`);
      } else {
        if (left === right)
          console.log(" ".repeat(left * 2) + "*");
        else
          console.log(" ".repeat(right * 2) + "R", " ".repeat(Math.max((left - right - 1) * 2 - 1, 1)), "L");
      }
      console.log("-".repeat(38));
      console.log();
    }

    isVisualize--;
    if (isVisualize === 0) {
      // break;
    }
  }

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
    solution: part1_2ptrs,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
