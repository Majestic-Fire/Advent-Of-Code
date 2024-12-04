import run from "aocrunner";

function isSafe(numbers) {

  let increasing = true;

  const initialDiff = numbers[1] - numbers[0];
  if (initialDiff < 0) { increasing = false; }

  if (Math.abs(initialDiff) > 3 || initialDiff < 1) {
    return false;
  }

  for (let i = 1; i < numbers.length - 1; i++) {
    const diff = numbers[i + 1] - numbers[i];

    // check direction
    if (increasing && diff < 0) { return false; }
    if (!increasing && diff > 0) { return false; }

    // check diff
    if (Math.abs(diff) > 3 || diff < 1) { return false; }

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
    // console.log(numbers);

    let isSafe = true;

    const initialDiff = numbers[1] - numbers[0];
    // console.log("- initialDiff", initialDiff);
    if (Math.abs(initialDiff) > 3 || initialDiff == 0) { isSafe = false; continue; }

    for (let i = 1; i < numbers.length - 1; i++) {
      const diff = numbers[i + 1] - numbers[i];
      // console.log(`- diff [${i}]: ${diff}`);

      // not all incresaing or decreasing
      if (initialDiff < 0 && diff > 0) { isSafe = false; break; }
      if (initialDiff > 0 && diff < 0) { isSafe = false; break; }

      // Any two adjacent levels differ by at least one and at most three.
      // =0 or >3 : is not safe
      // we checked direction above, so we check abs value  
      if (Math.abs(diff) > 3 || diff == 0) {
        // console.log("- not safe >", diff);
        isSafe = false;
        break;
      }

    }

    if (isSafe) {
      safeCount++;
      // console.log("* safeCount(+1):", safeCount);
    }
  }


  return safeCount;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  let safeCount = 0;
  for (const line of lines) {
    const numbers = line.split(" ").map(Number);
    console.log("\n", numbers);

    let isSafe = true;
    let skipCount = 0;

    const initialDiff = numbers[1] - numbers[0];
    console.log("- initialDiff", initialDiff);
    if (Math.abs(initialDiff) > 3 || initialDiff == 0) { skipCount++; }

    for (let i = 1; i < numbers.length - 1; i++) {
      const diff = numbers[i + 1] - numbers[i];
      console.log(`- diff [${numbers[i + 1]}-${numbers[i]}]: ${diff}`);


      // not all incresaing or decreasing
      if (initialDiff < 0 && diff > 0) {
        console.log("* direction inverse, unsafe!");
        isSafe = false;
      }
      if (initialDiff > 0 && diff < 0) {
        console.log("* direction inverse, unsafe!");
        isSafe = false;
      }

      // Any two adjacent levels differ by at least one and at most three.
      // =0 or >3 : is not safe
      // we checked direction above, so we check abs value  
      if (Math.abs(diff) > 3 || diff == 0) {
        console.log("- not safe >", diff);
        isSafe = false;
      }

      if (!isSafe) {
        skipCount++;
        isSafe = true;
        numbers.splice(i + 1, 1);
        i--;
        console.log("- skipCount(+1):", skipCount);
        console.log("+ new Numbers:", numbers);

        if (skipCount > 1) {
          console.log("* skipCount > 1, unsafe!");
          isSafe = false;
          break;
        }
      }

    }

    if (isSafe) {
      safeCount++;
      console.log("* safeCount(+1):", safeCount);
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
  onlyTests: true,
});
