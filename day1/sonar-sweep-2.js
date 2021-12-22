const path = require('path');
const { readInput, convertInputToList } = require('../helpers/data');

const depthIncreaseInTriplets = (inputList) => {
  const N = inputList.length;
  inputList = inputList.map((elt) => +elt);
  let count = 0;
  let sum = 0;

  for (let idx = 0; idx < N; idx++) {
    sum += inputList[idx];
    if (idx >= 3) {
      const prevSum = sum - inputList[idx];
      sum -= inputList[idx - 3];
      if (sum > prevSum) count += 1;
    }
  }
  return count;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log('Count = ', depthIncreaseInTriplets(inputData));
})();
