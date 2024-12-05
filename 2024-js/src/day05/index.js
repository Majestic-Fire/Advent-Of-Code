import run from "aocrunner";

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

const topologicalSort = (numberList, order_rules_map) => {
  const inDegree = new Map(); // # of incoming edges
  const graph = new Map(); // adjacency list graph
  // ? Example:
  // ? numberList: [1, 2, 3, 4]
  // ? order rule: 1->2, 1->3, 3->4

  // Initialize the graph, create Node
  // ? inDegree: {1: 0, 2: 0, 3: 0, 4: 0}
  // ? graph: {1: [], 2: [], 3: [], 4: []}
  numberList.forEach(num => {
    inDegree.set(num, 0);
    graph.set(num, []);
  });

  // Make Reverse map, how many incoming edges
  // Just grab related map, instead of my ALL rules
  // ? inDegree: {1: 0, 2: 1, 3: 1, 4: 1}
  // ? graph: {1: [2, 3], 2: [], 3: [4], 4: []}
  numberList.forEach(num => {
    if (order_rules_map.has(num)) {
      order_rules_map.get(num).forEach(neighbour => {
        if (inDegree.has(neighbour)) {
          // 前: 插邊個
          graph.get(num).push(neighbour);
          // 後: 被插數 +1
          inDegree.set(neighbour, inDegree.get(neighbour) + 1);
        }
      });
    }
  });

  // console.log("===== sorting NOW =====");
  // console.log(order_rules_map);
  // console.log(inDegree);
  // console.log(graph);

  // Find all 被插數 = 0, 起頭
  // their order is not important
  const queue = [];
  inDegree.forEach((degree, node) => {
    if (degree === 0) {
      queue.push(node);
    }
  });

  // Process the queue
  // ? inDegree: {1: 0, 2: 1, 3: 1, 4: 1}
  // ? graph: {1: [2, 3], 2: [], 3: [4], 4: []}
  // ? queue: [1]
  const sortedOrder = [];
  while (queue.length > 0) {
    const node = queue.shift(); // get first in queue
    sortedOrder.push(node);
    graph.get(node).forEach(neighbour => {
      // ? 放1 ; 2 3 被插數 -1
      inDegree.set(neighbour, inDegree.get(neighbour) - 1);
      // ? 如果 prev node 以放置完
      // ? 自己 order 冇 前面的 dependency
      // ? 自己可以放入 queue , to be placed
      if (inDegree.get(neighbour) === 0) {
        queue.push(neighbour);
      }
    });
  }

  return sortedOrder;
};

const part2 = (rawInput) => {
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
      const new_number_list = topologicalSort(update_order, order_rules_map);
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
