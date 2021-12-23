const path = require('path');
const { readInput, convertInputToList } = require('../helpers/data');

const computePowerValue = (inputData, type) => {
  const bits = inputData[0].length;

  for (let bit = 0; bit < bits; bit++) {
    let zeroBitCount = 0;
    let oneBitCount = 0;
    const hashMap = new Map([
      ['0', []],
      ['1', []],
    ]);
    for (let idx = 0; idx < inputData.length; idx++) {
      const bitVal = inputData[idx][bit];
      const bitDataList = hashMap.get(bitVal);
      bitDataList.push(inputData[idx]);
      hashMap.set(bitVal, bitDataList);
      if (bitVal === '1') oneBitCount += 1;
      else zeroBitCount += 1;
    }

    let value = null;
    if (type === 'gamma') {
      value = zeroBitCount > oneBitCount ? '0' : '1';
    } else {
      value = zeroBitCount < oneBitCount ? '0' : '1';
    }

    if (zeroBitCount === oneBitCount) {
      value = type === 'gamma' ? '1' : '0';
    }

    inputData = hashMap.get(value);
    if (inputData.length === 1) return parseInt(inputData[0], 2);
  }

  return -1;
};
const computePowerConsumption = (inputData) => {
  const oxygen = computePowerValue(inputData, 'gamma');
  const co2 = computePowerValue(inputData, 'epsilon');
  return oxygen * co2;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = convertInputToList(await readInput(INPUT_PATH));
  console.log('Result = ', computePowerConsumption(inputData));
})();
