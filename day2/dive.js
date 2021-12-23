const path = require('path');
const { readInput, convertInputToList } = require('../helpers/data');

const computePosition = (inputData) => {
  let horizontal = 0;
  let vertical = 0;
  for (const data of inputData) {
    const [direction, value] = data.split(' ');
    if (direction === 'forward') {
      horizontal += +value;
    } else if (direction === 'up') {
      vertical -= +value;
    } else if (direction === 'down') {
      vertical += +value;
    }
  }

  return horizontal * vertical;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log('Result = ', computePosition(inputData));
})();
