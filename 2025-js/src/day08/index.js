import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  const boxes = rawInput.split("\n").map(line => {
    const [x, y, z] = line.split(",").map(Number);
    return { x, y, z };
  });

  // console.log({ boxes });
  return boxes;
};

const euclideanDistance = (box1, box2) => {
  const dx = box1.x - box2.x;
  const dy = box1.y - box2.y;
  const dz = box1.z - box2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const part1 = (rawInput) => {
  const boxes = parseInput(rawInput);

  // Create all possible edges with distances
  const edges = [];
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      edges.push({
        i,
        j,
        distance: euclideanDistance(boxes[i], boxes[j])
      });
    }
  }

  // Sort edges by distance (shortest first)
  edges.sort((a, b) => a.distance - b.distance);

  // Track which circuit each box belongs to
  const boxToCircuit = boxes.map((_, i) => i);
  const circuitSize = boxes.map(() => 1);

  // Try to connect shortest edges - 10 for test, 1000 for actual
  const connectionsToTry = boxes.length > 100 ? 1000 : 10;

  for (let i = 0; i < connectionsToTry && i < edges.length; i++) {
    const edge = edges[i];
    const circuitI = boxToCircuit[edge.i];
    const circuitJ = boxToCircuit[edge.j];

    if (circuitI !== circuitJ) {
      // Merge circuits
      for (let k = 0; k < boxes.length; k++) {
        if (boxToCircuit[k] === circuitJ) {
          boxToCircuit[k] = circuitI;
        }
      }
      circuitSize[circuitI] += circuitSize[circuitJ];
      circuitSize[circuitJ] = 0;
    }
  }

  // Get sizes of remaining circuits
  const sizes = circuitSize.filter(s => s > 0).sort((a, b) => b - a);

  return sizes[0] * sizes[1] * sizes[2];
};

const part2 = (rawInput) => {
  const boxes = parseInput(rawInput);

  // Create all possible edges with distances
  const edges = [];
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      edges.push({
        i,
        j,
        distance: euclideanDistance(boxes[i], boxes[j])
      });
    }
  }

  // Sort edges by distance (shortest first)
  edges.sort((a, b) => a.distance - b.distance);

  // Track which circuit each box belongs to
  const boxToCircuit = boxes.map((_, i) => i);
  const circuitSize = boxes.map(() => 1);

  let lastConnection = null;

  for (const edge of edges) {
    const circuitI = boxToCircuit[edge.i];
    const circuitJ = boxToCircuit[edge.j];

    if (circuitI !== circuitJ) {
      // Merge circuits
      for (let k = 0; k < boxes.length; k++) {
        if (boxToCircuit[k] === circuitJ) {
          boxToCircuit[k] = circuitI;
        }
      }
      circuitSize[circuitI] += circuitSize[circuitJ];
      circuitSize[circuitJ] = 0;

      lastConnection = edge;

      // Check if all boxes are in one circuit
      if (circuitSize[circuitI] === boxes.length) {
        break;
      }
    }
  }

  // Multiply X coordinates of last connection
  return boxes[lastConnection.i].x * boxes[lastConnection.j].x;
};

run({
  part1: {
    tests: [
      {
        input: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
        expected: 40,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
        expected: 25272,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
