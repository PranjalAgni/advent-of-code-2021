const path = require('path');
const { readInput, convertInputToList } = require('../helpers/data');

const computePositionWithAim = (inputData) => {
  let horizontal = 0;
  let vertical = 0;
  let aim = 0;
  for (const data of inputData) {
    const [direction, value] = data.split(' ');
    if (direction === 'forward') {
      horizontal += +value;
      vertical += aim * +value;
    } else if (direction === 'up') {
      vertical -= +value;
      aim -= +value;
    } else if (direction === 'down') {
      vertical += +value;
      aim += +value;
    }
  }

  return horizontal * vertical;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log('Result = ', computePositionWithAim(inputData));
})();
