const path = require('path');
const { readInput, convertInputToList } = require('../helpers/data');

const getSegmentsToDigitMap = () => {
  return {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
  };
};

const solve = (inputList) => {
  let ans = 0;
  for (const line of inputList) {
    const outputSegment = line.split(' | ')[1];
    const outputList = outputSegment.split(' ');
    const uniqueSegments = outputList.filter((output) => {
      const length = output.length;
      return length === 2 || length === 4 || length === 3 || length === 7;
    });
    ans += uniqueSegments.length;
  }

  return ans;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log('Unique segments = ', solve(inputList));
})();
