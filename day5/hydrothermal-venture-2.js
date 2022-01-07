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
    let startX = x1;
    let startY = y1;
    let endX = x2;
    let endY = y2;
    while (true) {
      matrix[startX][startY] += 1;
      if (startX === x2 && startY === y2) break;
      startX += endX > startX ? 1 : -1;
      startY += endY > startY ? 1 : -1;
      console.log({ startX, startY });
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
  const INPUT_PATH = path.join(__dirname, 'small-input.txt');
  const inputData = await readInput(INPUT_PATH);
  const data = parseCordinates(inputData);
  const dimensions = getMatrixDimensions(data);
  const matrix = generateMatrix(dimensions);
  const answer = solve(matrix, data);
  console.log(answer);
})();
