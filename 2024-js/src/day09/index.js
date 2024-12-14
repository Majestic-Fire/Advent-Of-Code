import run from "aocrunner";
import * as Util from "../utils/index.js";

// Visualization with colors
const color = Util.COLORS;

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const numbers = input.split("").map(Number);

  let disk = [];
  let currId = 0;
  let isFile = true;

  numbers.forEach((num) => {
    if (isFile) {
      disk.push(...Array(num).fill(currId));
      currId++;
    }
    else {
      disk.push(...Array(num).fill(-1));
    }

    isFile = !isFile;
  });

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === -1) {
      let lastElement = disk.pop();
      disk[i] = lastElement;

      // remove trailing -1s
      while (disk[disk.length - 1] === -1) {
        disk.pop();
      }
    }
  }

  console.log(disk.slice(50000, 52000));

  let result = 0;
  for (let i = 0; i < disk.length; i++) {
    result += disk[i] * i;
  }

  return result;
};

const part1_2ptrs = (rawInput) => {
  const input = parseInput(rawInput);
  const numbers = input.split("").map(Number);

  const isVisualize = false;

  let currId = 0;
  let lastId = Math.ceil(numbers.length / 2) - 1;
  let isFile = true;

  let result = 0;
  let left = 0;
  let right = numbers.length - 1;
  let pos = 0;

  if (isVisualize) {
    const coloredNumbers = numbers.map((num, idx) => {
      return idx % 2 === 0 ? `${color.Green}${num}${color.Reset}` : `${color.Red}${num}${color.Reset}`;
    }).join(" ");
    console.log(coloredNumbers, "\t", result);
    console.log(" ".repeat(left * 2) + "L", `${" ".repeat(Math.max((right - left - 1) * 2, 0))}R`);
    console.log("-".repeat(38));
  }

  while (left < right) {
    if (numbers[left] === 0) {
      if (isFile) currId++;
      left++;
    }

    if (numbers[right] === 0) {
      lastId--;
      right -= 2; // go to next file, skip the space
    }

    if (isVisualize) {
      console.log("left:", left, "right:", right, "isFile:", isFile);
    }

    if (isFile) {

      const endPos = pos + numbers[left] - 1;
      const sumOfPos = (pos + endPos) * numbers[left] / 2;
      result += currId * sumOfPos;

      // visualize use
      if (isVisualize) {
        const positions = Array.from({ length: endPos - pos + 1 }, (v, i) => (pos + i));
        console.log(`${color.Cyan}Eqn: ${currId} * (${positions.join(",")}) = ${currId * sumOfPos}${color.Reset}`);
        console.log(`${color.Green}File[id-${currId}] Count: ${numbers[left]} at ${left}${color.Reset}`);
      }

      pos = endPos + 1; // update next pos
      isFile = !isFile;
      numbers[left] = 0;
    } else {
      // numbers[left] is space now;
      // numbers[right] is file;
      const moveable = Math.min(numbers[left], numbers[right]);

      const endPos = pos + moveable - 1;
      const sumOfPos = (pos + endPos) * moveable / 2;
      result += lastId * sumOfPos;


      // visualize use
      if (isVisualize) {
        const positions = Array.from({ length: endPos - pos + 1 }, (v, i) => (pos + i));
        console.log(`${color.Cyan}Eqn: ${lastId} * (${positions.join(",")}) = ${lastId * sumOfPos}${color.Reset}`);
        console.log(`${color.Red}Space Used: ${moveable} at ${left}${color.Reset}, ${color.Green}File[id-${lastId}] Count: ${moveable} at ${right}${color.Reset}`);
      }

      pos = endPos + 1; // update next pos

      const enoughSpace = numbers[left] > numbers[right];
      if (enoughSpace) {
        numbers[left] -= numbers[right];
        numbers[right] = 0;
      } else {
        numbers[right] -= numbers[left];
        numbers[left] = 0;
        isFile = !isFile; // space is used up (left side)
      }

    }

    if (isVisualize) {
      const coloredNumbers = numbers.map((num, idx) => {
        return idx % 2 === 0 ? `${color.Green}${num}${color.Reset}` : `${color.Red}${num}${color.Reset}`;
      }).join(" ");
      console.log(coloredNumbers, "\t", result);
      if (left < right) {
        console.log(" ".repeat(left * 2) + "L", `${" ".repeat(Math.max((right - left - 1) * 2, 0))}R`);
      } else {
        if (left === right)
          console.log(" ".repeat(left * 2) + "*");
        else
          console.log(" ".repeat(right * 2) + "R", " ".repeat(Math.max((left - right - 1) * 2 - 1, 1)), "L");
      }
      console.log("-".repeat(38));
    }
  }

  return result;
};

const part1_class = (rawInput) => {
  const input = parseInput(rawInput);
  const numbers = input.split("").map(Number);

  // Visualization with colors
  const isVisualize = false;
  function getColoredBlocks(blocks) {
    return blocks.map((id, index) => {
      return id === -1 ? `${color.Red}${"."}${color.Reset}` : `${color.Green}${id}${color.Reset}`;
    }).join(" ");
  }

  // Build blocks array with file IDs and free spaces (-1)
  let blocks = [];
  let fileId = 0;

  numbers.forEach((num, index) => {
    if (index % 2 === 0) {
      // File
      blocks.push(...Array(num).fill(fileId));
      fileId++;
    } else {
      // Free space
      blocks.push(...Array(num).fill(-1));
    }
  });

  if (isVisualize) {
    console.log(`Initial Blocks: \n${getColoredBlocks(blocks)}\n`);
  }

  let firstFree = -1;
  while (true) {
    // Find first free space after 'firstFree'
    firstFree = blocks.indexOf(-1, firstFree + 1);
    if (firstFree === -1) break;

    // Remove the last non-free element
    let lastIndex = blocks.length - 1;
    while (blocks[lastIndex] === -1 && lastIndex >= 0) {
      lastIndex--;
    }
    if (lastIndex <= firstFree) break;

    const movedFileId = blocks[lastIndex];
    blocks.splice(lastIndex, 1); // Remove last file
    blocks[firstFree] = movedFileId; // Move to first free space

    if (isVisualize) {
      console.log(`Moved File ID ${movedFileId} from position ${lastIndex} to ${firstFree}`);
      console.log(`Current Blocks: \n${getColoredBlocks(blocks)}\n`);
    }
  }

  // Calculate checksum: sum of index * fileId
  let result = 0;
  blocks.forEach((id, index) => {
    if (id !== -1) {
      result += index * id;
    }
  });

  if (isVisualize) {
    console.log(`Final Blocks: \n${getColoredBlocks(blocks)}\n`);
    console.log(`Checksum: ${result}\n`);
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const numbers = input.split("").map(Number);

  // Visualization with colors
  const isVisualize = false;

  // Define the Block class with linked list pointers
  class Block {
    constructor(id, size) {
      this.id = id; // File ID or -1 for free space
      this.size = size;
      this.prev = null;
      this.next = null;
    }
  }

  // Function to visualize the blocks
  function list_print(head, track = null) {
    let result = '';
    let current = head;
    let i = 1;

    while (current) {
      const idText = current.id === -1 ? "FREE" : `OCCP (ID-${current.id})`;
      const coloredText = current.id === -1
        ? `${color.Red}${idText}${color.Reset}`
        : `${color.Green}${idText}${color.Reset}`;
      const tracker = current === track ? `${color.Cyan}▶${color.Reset}` : " ";
      result += `${tracker} Block ${String(i).padStart(2, '0')}: (size = ${current.size}) [${coloredText}]\n`;
      current = current.next;
      i++;
    }

    return result;
  }

  // Function to build the linked list of blocks
  function list_build(numbers) {
    let head = null;
    let tail = null;
    let fileId = 0;

    numbers.forEach((fileSize, index) => {
      const newBlock = new Block(index % 2 === 0 ? fileId++ : -1, fileSize);

      if (!head) {
        head = newBlock;
        tail = newBlock;
      } else {
        tail.next = newBlock; // last one point to curr
        newBlock.prev = tail;
        tail = newBlock;
      }
    });

    return { head, tail };
  }

  function list_checkSum(head) {
    let checkSum = 0;
    let pos = 0;
    let current = head;

    while (current) {
      if (current.id !== -1) {
        const endPos = pos + current.size - 1;
        const sumOfPos = (pos + endPos) * current.size / 2;
        checkSum += current.id * sumOfPos;
        pos = endPos + 1;

        if (isVisualize) {
          const postions = Array.from({ length: current.size }, (v, i) => ((pos - current.size) + i));
          console.log(`File ID-${current.id} x (${postions.join(",")}) = ${current.id * sumOfPos}`);
        }
      } else {
        pos += current.size;
      }

      current = current.next;
    }

    return checkSum;
  }

  // TODO: clean the code
  function list_compact(head, tail) {
    let current = head;
    while (current) {
      // If not space/no space, find next free space
      if (current.id !== -1) {
        current = current.next;
      }

      // 0. Found fit file (from right to left)
      let isFound = false;
      let fitFile = tail;
      while (fitFile) {

        if (fitFile === current) {
          break;
        }
        if (fitFile.id === -1 || fitFile.size > current.size) {
          fitFile = fitFile.prev; // Move to left, if it's space or big file
        } else {
          isFound = true;
          break; // Found fit file
        }
      }
      // no fit file for current space, go to next block
      if (!isFound) {
        current = current.next;
        continue;
      }

      // 1. Copy Fit file block
      let fitBlock = new Block(fitFile.id, fitFile.size);
      current.prev.next = fitBlock;
      fitBlock.prev = current.prev;

      // 2. Turn Fit file block to Free space
      fitFile.id = -1;

      // 3. Modify current remain space block
      current.size -= fitBlock.size;
      current.prev = fitBlock;
      fitBlock.next = current;

      // 4. Remove 0 size free space
      if (current.size === 0) {
        current.prev.next = current.next;
        if (current.next) {
          current.next.prev = current.prev;
        }
      }

      if (isVisualize) {
        console.log(`Move ${color.Green + "Block ID-" + fitBlock.id + color.Reset}`);
        console.log(`Current Blocks: \n${list_print(head, current.prev)}`);
      }

    }
  }

  // 1. Init the linked list of blocks
  const { head, tail } = list_build(numbers);
  if (isVisualize) {
    console.log(`Initial Blocks: \n${list_print(head)}`);
  }

  // 2. Compact the blocks
  list_compact(head, tail);
  if (isVisualize) {
    console.log(`Final Blocks:\n${list_print(head)}`);
  }

  // 3. Calculate checksum
  const result = list_checkSum(head);
  if (isVisualize) {
    console.log(`Checksum: ${result}\n`);
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    solution: part1_class,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
