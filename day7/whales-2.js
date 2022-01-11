const path = require('path');
const { readInput } = require('../helpers/data');

/**
 * @param {number[]} data
 */
const solve = (data) => {
  const N = data.length;
  let minFuel = Number.MAX_SAFE_INTEGER;
  for (const fixedFuelPosition of data) {
    let currentMinFuel = 0;
    for (let idx = 0; idx < N; idx++) {
      const fuel = data[idx];
      const fuelConstantRate = Math.abs(fuel - fixedFuelPosition);
      const fuelRate = (fuelConstantRate * (fuelConstantRate + 1)) / 2;
      currentMinFuel += fuelRate;
    }
    minFuel = Math.min(minFuel, currentMinFuel);
  }

  return minFuel;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  const data = inputData.split(',').map(Number);
  console.log(solve(data));
})();
