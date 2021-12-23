const path = require('path');
const { readInput, convertInputToList } = require('../helpers/data');

const computePowerConsumption = (inputData) => {
  const N = inputData.length;
  const bits = inputData[0].length;
  let gammaRate = '';
  let epsilonRate = '';

  for (let bit = 0; bit < bits; bit++) {
    let zeroBitCount = 0;
    let oneBitCount = 0;
    for (let idx = 0; idx < N; idx++) {
      const bitVal = inputData[idx][bit];
      if (bitVal === '1') oneBitCount += 1;
      else zeroBitCount += 1;
    }

    gammaRate += zeroBitCount > oneBitCount ? 0 : 1;
    epsilonRate += zeroBitCount < oneBitCount ? 0 : 1;
  }

  const gammaRateDecimal = parseInt(gammaRate, 2);
  const epsilonRateDecimal = parseInt(epsilonRate, 2);
  return gammaRateDecimal * epsilonRateDecimal;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log('Result = ', computePowerConsumption(inputData));
})();
