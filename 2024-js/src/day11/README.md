# 🎄 Advent of Code 2024 - day 11 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/11)

## Notes

-  flatMap = .map().flat()
```js
const arr = [1, 2, 3];
const flatArr = arr.flatMap((x) => [x, 2*x]);
console.log(flatArr); // [[1, 2], [2, 4], [3, 6]] ==> [1, 2, 2, 4, 3, 6]
```
...