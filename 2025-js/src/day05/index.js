import run from "aocrunner";
import * as Util from "../utils/index.js";

const parseInput = (rawInput) => {
  const rangePattern = /(\d+)-(\d+)/g;
  const idPattern = /^(\d+)$/gm;

  const ranges = [...rawInput.matchAll(rangePattern)].map(match => [
    Number(match[1]),
    Number(match[2])
  ]);

  const ids = [...rawInput.matchAll(idPattern)].map(match => Number(match[1]));

  // console.log({ ranges, ids });

  return { ranges, ids };
};

const mergeRanges = (ranges) => {
  if (!ranges || ranges.length === 0) return [];

  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1] + 1) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
};

const isInRange = (id, ranges) => {
  return ranges.some(([start, end]) => id >= start && id <= end);
};

const part1 = (rawInput) => {
  const { ranges, ids } = parseInput(rawInput);
  const merged = mergeRanges(ranges);

  const freshIds = ids.filter(id => isInRange(id, merged));

  return freshIds.length;
};

const part2 = (rawInput) => {
  const { ranges } = parseInput(rawInput);
  const merged = mergeRanges(ranges);

  let result = 0;
  // console.log({ merged });

  merged.forEach(range => {
    const start = range[0];
    const end = range[1];
    result += end - start + 1;
  });

  return result;
};

run({
  part1: {
    tests: [
      {
        input: ``,
        expected: "",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: ``,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
