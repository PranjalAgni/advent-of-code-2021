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
  const segmentVsDigitMap = getSegmentsToDigitMap();
  for (const line of inputList) {
    const outputSegment = line.split(' | ')[1];
    const outputList = outputSegment.split(' ');
    for (const output of outputList) {
      // TODO:
      // sort output string
      // compare output against map
      // if its in 1,4,7,8 -> increment count
    }
  }
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log(solve(inputList));
})();
