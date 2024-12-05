# 🎄 Advent of Code 2024 - day 5 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/5)

## Notes

- Build map K -> arr of V
```js
  const order_rules_map = new Map();

  order_rules.forEach((rule) => {
    const [key, value] = rule.split("|").map((x) => Number(x));
    order_rules_map.set(key, [value, ...(order_rules_map.get(key) || [])]);
  });
```

- divide 2^x by bitwise shift
```js
  result += update_order[Math.floor(update_order.length / 2)];  

  result += update_order[update_order.length >> 1];

```
...
