const path = require('path');
const { readInput } = require('../helpers/data');

const MAX_STEPS = 10;
const parseInput = (inputData) => {
  const rows = inputData.split('\n');
  const matrix = [];
  for (const row of rows) {
    const cols = row.split('').map(Number);
    matrix.push(cols);
  }

  return matrix;
};

const printMatrix = (matrix, step) => {
  console.log(`\n\nAfter step = ${step + 1}`);
  for (const row of matrix) {
    const prettyRow = row.join(' ');
    console.log(prettyRow);
  }
};

const isValid = (row, col) => row >= 0 && row < 10 && col >= 0 && col < 10;
const stringifyPosition = (row, col) => `${row}-${col}`;

const dfs = (matrix, row, col, visitedMap, data) => {
  const key = stringifyPosition(row, col);
  if (visitedMap.has(key)) return;
  visitedMap.set(key, true);
  matrix[row][col] = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const [x, y] of directions) {
    const neighbourRow = row + x;
    const neighbourCol = col + y;
    const neighbourKey = stringifyPosition(neighbourRow, neighbourCol);
    if (isValid(neighbourRow, neighbourCol) && !visitedMap.has(neighbourKey)) {
      matrix[neighbourRow][neighbourCol] += 1;
      if (matrix[neighbourRow][neighbourCol] > 9) {
        data.flashes += 1;
        dfs(matrix, neighbourRow, neighbourCol, visitedMap, data);
      }
    }
  }
};

const solve = (matrix) => {
  let answer = 0;
  for (let step = 0; step < MAX_STEPS; step++) {
    const visitedMap = new Map();
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        matrix[row][col] += 1;
        if (matrix[row][col] > 9) {
          // dfsList.push({ row, col });
          const data = { flashes: 0 };
          dfs(matrix, row, col, visitedMap, data);
          answer += data.flashes;
        }
      }
    }

    // for (const dfsPoint of dfsList) {
    //   const { row, col } = dfsPoint;
    //   const data = { flashes: 1 };
    //   dfs(matrix, row, col, visitedMap, data);
    //   answer += data.flashes;
    // }

    printMatrix(matrix, step);
  }

  return answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'small-input.txt');
  const inputData = await readInput(INPUT_PATH);
  const matrix = parseInput(inputData);
  console.log(solve(matrix));
})();

/**
 

  6 5 9 4 2 5 4 3 3 4
  3 8 5 6 9 6 5 8 2 2
  6 3 7 5 6 6 7 2 8 4
  7 2 5 2 4 4 7 2 5 7
  7 4 6 8 4 9 6 5 8 9
  5 2 7 8 6 3 5 7 5 6
  3 2 8 7 9 5 2 8 3 2
  7 9 9 3 9 9 2 2 4 5
  5 9 5 7 9 5 9 6 6 5
  6 3 9 4 8 6 2 6 3 7

  7 8 0 6 4 6 5 4 4 5
  5 0 8 8 0 7 6 9 3 3
  7 4 7 5 6 6 7 2 8 4
  7 2 5 2 4 4 7 2 5 7
  7 4 6 8 4 9 6 5 8 9
  5 2 7 8 6 3 5 7 5 6
  3 2 8 7 9 5 2 8 3 2
  7 9 9 3 9 9 2 2 4 5
  5 9 5 7 9 5 9 6 6 5
  6 3 9 4 8 6 2 6 3 7
 */
