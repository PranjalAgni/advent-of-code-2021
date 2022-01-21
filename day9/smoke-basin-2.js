const path = require('path');
const { readInput } = require('../helpers/data');

const parseInput = (inputData) => {
  const rows = inputData.split('\n');
  const matrix = [];
  for (const row of rows) {
    const cols = row.split('').map(Number);
    matrix.push(cols);
  }

  return matrix;
};

const isValid = (row, col, rows, cols) => {
  return row >= 0 && row < rows && col >= 0 && col < cols;
};

const findLowPoints = (matrix) => {
  const rows = matrix.length;
  const lowPointsList = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let row = 0; row < rows; row++) {
    const cols = matrix[row].length;
    for (let col = 0; col < cols; col++) {
      const value = matrix[row][col];
      let isFound = true;
      for (const [a, b] of directions) {
        const neighbourRow = row + a;
        const neighbourCol = col + b;
        if (isValid(neighbourRow, neighbourCol, rows, cols)) {
          if (value >= matrix[neighbourRow][neighbourCol]) {
            isFound = false;
            break;
          }
        }
      }
      if (isFound) lowPointsList.push({ row, col });
    }
  }

  return lowPointsList;
};

const stringifyCoordinates = (row, col) => `${row}-${col}`;

const bfs = (coordinates, rows, cols, matrix) => {
  let size = 0;
  const queue = [coordinates];
  const hashMap = new Map();
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  while (queue.length > 0) {
    const { row, col } = queue.shift();
    const key = stringifyCoordinates(row, col);
    if (hashMap.has(key)) continue;
    hashMap.set(key, true);
    size += 1;
    for (const [x, y] of directions) {
      const neighbourRow = row + x;
      const neighbourCol = col + y;
      if (
        isValid(neighbourRow, neighbourCol, rows, cols) &&
        matrix[neighbourRow][neighbourCol] !== 9
      ) {
        queue.push({ row: neighbourRow, col: neighbourCol });
      }
    }
  }

  return size;
};

const recordAnswer = (threeLargestBasin, size) => {
  for (let idx = 0; idx < 3; idx++) {
    if (size > threeLargestBasin[idx]) {
      for (let jdx = 2; jdx > idx; jdx--) {
        threeLargestBasin[jdx] = threeLargestBasin[jdx - 1];
      }
      threeLargestBasin[idx] = size;
      break;
    }
  }
};
const solve = (lowPointsList, rows, cols, matrix) => {
  const threeLargestBasin = [0, 0, 0];

  for (const coordinates of lowPointsList) {
    const size = bfs(coordinates, rows, cols, matrix);
    recordAnswer(threeLargestBasin, size);
  }

  return threeLargestBasin.reduce((acc, elt) => acc * elt, 1);
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  const matrix = parseInput(inputData);
  const lowPointsList = findLowPoints(matrix);
  const threeLargestBasin = solve(
    lowPointsList,
    matrix.length,
    matrix[0].length,
    matrix
  );
  console.log(threeLargestBasin);
})();
