import run from "aocrunner";
import { sort } from "../utils/index.js";

const parseInput = (rawInput) => {
  const [section1, section2] = rawInput.split("\n\n");

  // === Section 1 process
  const order_rules = section1.split("\n");
  const order_rules_map = new Map();

  order_rules.forEach((rule) => {
    const [key, value] = rule.split("|").map((x) => Number(x));
    order_rules_map.set(key, [value, ...(order_rules_map.get(key) || [])]);
  });

  // === Section 2 process
  const update_orders = section2
    .split("\n")
    .map((order) => order.split(",").map(Number));

  return { order_rules_map, update_orders };
};

const part1 = (rawInput) => {
  const { order_rules_map, update_orders } = parseInput(rawInput);

  // === Answer
  let result = 0;

  for (const update_order of update_orders) {
    let valid = true;

    for (let i = 0; i < update_order.length; i++) {
      const curr = update_order[i];
      for (let j = i + 1; j < update_order.length; j++) {
        const next = update_order[j];
        // if curr next 反了, incorrect
        // Map : 前 => [後]
        // 如果 next 的 rule 裡面有 curr(後), 代表反了
        // 因爲現在 curr 是 next 的前面, 不是後
        if (order_rules_map.has(next) && order_rules_map.get(next).includes(curr)) {
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      result += update_order[update_order.length >> 1];
      // console.log(update_order);
    }
  }
  return result;
};



const part2 = (rawInput) => {
  const { order_rules_map, update_orders } = parseInput(rawInput);

  // === Answer
  let result = 0;

  for (const update_order of update_orders) {
    let isCorrect = true;
    // console.log("\n===== New Order =====");

    for (let i = 0; i < update_order.length; i++) {
      const curr = update_order[i];
      let swapOffset = 0;

      for (let j = i + 1; j < update_order.length; j++) {
        // console.log(`Order${i}-${j}: ${update_order}`);
        const next = update_order[j];

        // if curr next 反了, shift it
        if (order_rules_map.has(next) && order_rules_map.get(next).includes(curr)) {
          // console.log(`shift ${next} before ${curr}`);

          // Remove the element at index j
          const [shiftedElement] = update_order.splice(j, 1);

          // Insert the element at index i
          update_order.splice(i, 0, shiftedElement);
          isCorrect = false;
          i--; // Re-evaluate the order at curr index
          break; // Break to re-evaluate the order after shifting
        }

      }
    }

    // Take corrected of incorrect order
    if (!isCorrect) {
      result += update_order[Math.floor(update_order.length / 2)];
      // console.log(update_order, "\n");
    }
  }
  return result;
};

const part2_kahn = (rawInput) => {
  console.log("- Running Part 2_Kahn's Algorithm");

  const { order_rules_map, update_orders } = parseInput(rawInput);

  let result = 0;

  update_orders.forEach(update_order => {
    let valid = true;

    // Check if the order is correct
    for (let i = 0; i < update_order.length; i++) {
      const curr = update_order[i];
      for (let j = i + 1; j < update_order.length; j++) {
        const next = update_order[j];
        if (order_rules_map.has(next) && order_rules_map.get(next).includes(curr)) {
          valid = false;
          break;
        }
      }
      if (!valid) break;
    }

    // Only count the incorrect order, fix it, sum of mid number
    if (!valid) {
      const new_number_list = sort.kahnSort(update_order, order_rules_map);
      result += new_number_list[new_number_list.length >> 1];
    }
  });

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
