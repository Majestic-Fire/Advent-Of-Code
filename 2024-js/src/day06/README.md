# 🎄 Advent of Code 2024 - day 6 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/6)

## Notes

- shallow copy

```js
    { ...guard }

    if (isLoop(maze, { ...guard }))
        result++;
```

- original object (deep)
  - the change in isLoop() affects the original object

```js
if (isLoop(maze, guard)) result++;
```

TODO: better algorithm

- find rectangle path , with corner +
- and place obstacle
