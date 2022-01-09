const path = require('path');
const { readInput } = require('../helpers/data');

const solve = (data, days) => {
  const fish = data;
  for (let day = 0; day < days; day++) {
    let N = fish.length;
    for (let fishIdx = 0; fishIdx < N; fishIdx++) {
      const fishValue = fish[fishIdx];
      if (fishValue > 0) {
        fish[fishIdx] -= 1;
      } else {
        fish[fishIdx] = 6;
        fish.push(8);
      }
    }
  }

  return fish.length;
};
(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  const data = inputData.split(',').map(Number);
  console.log(solve(data, 256));
})();
