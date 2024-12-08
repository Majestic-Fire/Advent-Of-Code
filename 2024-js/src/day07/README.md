# 🎄 Advent of Code 2024 - day 7 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/7)

## Notes

- Map() issue
- same key, different values

```js
241: 17 1 8 3 3 7
241: 24 1 1

const eqns = new Map();
eqns.set(Number(key), values.split(" ").map(Number));

const eqns =[];
eqns.push({ key: Number(key), values: values.split(" ").map(Number) });
```

- concatenate number
- num to string, concat, parse to num (faster)
  - String Concatenation: 71.956ms
  - Numerical Concatenation: 97.943ms

```js
const concatenateString = (a, b) => {
  return parseInt(a.toString() + b.toString(), 10);
};

const concatenateNumerical = (a, b) => {
  const bDigits = b.toString().length;
  return a * Math.pow(10, bDigits) + b;
};

const testPerformance = () => {
  const a = 12345;
  const b = 67890;
  const iterations = 1_000_000;

  console.time("String Concatenation");
  for (let i = 0; i < iterations; i++) {
    concatenateString(a, b);
  }
  console.timeEnd("String Concatenation");

  console.time("Numerical Concatenation");
  for (let i = 0; i < iterations; i++) {
    concatenateNumerical(a, b);
  }
  console.timeEnd("Numerical Concatenation");
};

testPerformance();
```

...
