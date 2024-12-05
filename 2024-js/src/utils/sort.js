const kahnSort = (numberList, order_rules_map) => {
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

const anotherSortAlgorithm = (array) => {
    // Implementation of another sorting algorithm
};

export { kahnSort, anotherSortAlgorithm };