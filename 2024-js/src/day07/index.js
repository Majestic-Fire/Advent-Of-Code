import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  const eqns = [];
  lines.forEach((line) => {
    const [key, values] = line.split(":").map((x) => x.trim());
    eqns.push({ k: Number(key), v: values.split(" ").map(Number) });
  });

  const evaluate = (v, operators) => {
    let product = v[0];
    operators.forEach((op, i) => {
      if (op === "+") {
        product += v[i + 1];
      } else if (op === "*") {
        product *= v[i + 1];
      }
    });
    return product;
  };

  function findOperators(v, k, operators) {
    // if found
    if (operators.length === v.length - 1) {
      const result = evaluate(v, operators);
      return result === k;
    }

    // recursion
    return (
      findOperators(v, k, [...operators, "+"]) ||
      findOperators(v, k, [...operators, "*"])
    );
  }

  let result = 0;
  eqns.forEach(({ k, v }) => {
    if (findOperators(v, k, [])) {
      result += k;
    }
  });
  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  const eqns = [];
  lines.forEach((line) => {
    const [key, values] = line.split(":").map((x) => x.trim());
    eqns.push({ k: Number(key), v: values.split(" ").map(Number) });
  });

  const evaluate = (v, operators) => {
    let product = v[0];
    operators.forEach((op, i) => {
      if (op === "+") {
        product += v[i + 1];
      } else if (op === "*") {
        product *= v[i + 1];
      } else if (op === "||") {
        product = product * Math.pow(10, v[i + 1].toString().length) + v[i + 1];
      }
    });
    return product;
  };

  function findOperators(v, k, operators) {
    // if found
    if (operators.length === v.length - 1) {
      const result = evaluate(v, operators);
      return result === k;
    }

    // recursion
    return (
      findOperators(v, k, [...operators, "||"]) ||
      findOperators(v, k, [...operators, "+"]) ||
      findOperators(v, k, [...operators, "*"])
    );
  }

  let result = 0;
  eqns.forEach(({ k, v }) => {
    if (findOperators(v, k, [])) {
      result += k;
    }
  });
  return result;
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
