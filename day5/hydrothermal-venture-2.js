const path = require('path');
const { readInput } = require('../helpers/data');

const parseCordinates = (inputData) => {
  const cordinates = inputData
    .split('\n')
    .map((cordinates) => cordinates.split(' -> '))
    .map(([cordinates1, cordinates2]) => {
      const [y1, x1] = cordinates1.split(',').map(Number);
      const [y2, x2] = cordinates2.split(',').map(Number);
      return { x1, y1, x2, y2 };
    });

  return cordinates;
};

const getMatrixDimensions = (cordinates) => {
  let rows = Number.MIN_SAFE_INTEGER;
  let cols = Number.MIN_SAFE_INTEGER;
  cordinates.forEach(({ x1, y1, x2, y2 }) => {
    rows = Math.max(rows, x1, x2);
    cols = Math.max(cols, y1, y2);
  });

  return { rows, cols };
};

const generateMatrix = ({ rows, cols }) => {
  const matrix = [];
  while (rows-- >= 0) {
    const row = new Array(cols + 1).fill(0);
    matrix.push(row);
  }

  return matrix;
};

const solve = (matrix, data) => {
  data.forEach(({ x1, y1, x2, y2 }) => {
    if (x1 === x2) {
      let start = Math.min(y1, y2);
      let end = Math.max(y1, y2);
      while (start <= end) {
        matrix[x1][start] += 1;
        start += 1;
      }
    } else if (y1 === y2) {
      let start = Math.min(x1, x2);
      let end = Math.max(x1, x2);
      while (start <= end) {
        matrix[start][y1] += 1;
        start += 1;
      }
    } else {
      while (true) {
        matrix[x1][y1] += 1;
        if (x1 === x2 && y1 === y2) break;
        x1 += x2 > x1 ? 1 : -1;
        y1 += y2 > y1 ? 1 : -1;
      }
    }
  });

  return countIntersectingLines(matrix);
};

const countIntersectingLines = (matrix) => {
  let answer = 0;
  for (const row of matrix) {
    for (const elt of row) {
      if (elt > 1) answer += 1;
    }
  }

  return answer;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  const data = parseCordinates(inputData);
  const dimensions = getMatrixDimensions(data);
  const matrix = generateMatrix(dimensions);
  const answer = solve(matrix, data);
  console.log(answer);
})();
