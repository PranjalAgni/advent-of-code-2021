const path = require('path');
const { readInput, convertInputToList } = require('../helpers/data');

const depthIncrease = (inputList) => {
  const N = inputList.length;
  let count = 0;
  for (let idx = 1; idx < N; idx++) {
    if (Number(inputList[idx]) > Number(inputList[idx - 1])) count += 1;
  }
  return count;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log('Count = ', depthIncrease(inputData));
})();
