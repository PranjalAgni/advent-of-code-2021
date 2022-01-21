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

const solve = (matrix) => {
  const rows = matrix.length;
  let answer = 0;
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
      if (isFound) answer += 1 + value;
    }
  }

  return answer;
};
(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  const matrix = parseInput(inputData);
  console.log(solve(matrix));
})();
