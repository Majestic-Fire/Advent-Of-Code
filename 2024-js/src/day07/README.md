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
...