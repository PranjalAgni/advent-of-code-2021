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

const resolveCharactersMapping = (charactersMapping) => {
  const finalCharacterMapping = {};
  let maxMappings = 0;
  const usedCharacters = new Set();
  Object.values(charactersMapping).forEach((values) => {
    maxMappings = Math.max(maxMappings, values.length);
  });

  for (let mapping = 1; mapping <= maxMappings; mapping++) {
    Object.entries(charactersMapping).forEach(([key, val]) => {
      if (val.length === mapping) {
        for (let idx = 0; idx < val.length; idx++) {
          if (!usedCharacters.has(val[idx])) {
            finalCharacterMapping[key] = val[idx];
            usedCharacters.add(val[idx]);
            break;
          }
        }
      }
    });
  }

  return finalCharacterMapping;
};

const computeMapping = (signalPattern, segmentVsDigitMap) => {
  const charactersMapping = {};
  const lengthVsSegmentMap = {
    2: 'cf',
    4: 'bcdf',
    3: 'acf',
    7: 'abcdefg',
  };
  const signalList = signalPattern.split(' ');
  for (const signal of signalList) {
    const length = signal.length;
    if (lengthVsSegmentMap[length]) {
      const targetSegment = lengthVsSegmentMap[length];
      for (let idx = 0; idx < length; idx++) {
        if (!charactersMapping[targetSegment[idx]])
          charactersMapping[targetSegment[idx]] = [];
        const mappingList = charactersMapping[targetSegment[idx]];
        mappingList.push(signal[idx]);
        charactersMapping[targetSegment[idx]] = mappingList;
      }
    }
  }

  return resolveCharactersMapping(charactersMapping);
};

const solve = (inputList) => {
  let ans = 0;
  const segmentVsDigitMap = getSegmentsToDigitMap();
  for (const line of inputList) {
    const [signalPattern, outputSegment] = line.split(' | ');
    const charactersMapping = computeMapping(signalPattern, segmentVsDigitMap);
    // console.log('Mapping = ', charactersMapping);
    const outputList = outputSegment.split(' ');
    let num = 0;
    for (const output of outputList) {
      const sortedOutput = output.split('').sort().join('');
      let digit = null;
      const length = sortedOutput.length;
      if (length === 2) digit = 1;
      else if (length === 4) digit = 4;
      else if (length === 3) digit = 7;
      else if (length === 7) digit = 8;
      else {
        // console.log('Old sorted output ', sortedOutput);
        for (let idx = 0; idx < length; idx++) {
          if (charactersMapping[sortedOutput[idx]]) {
            sortedOutput[idx] = charactersMapping[sortedOutput[idx]][0];
          }
        }
        // console.log('New sorted output ', sortedOutput);
        digit = segmentVsDigitMap[sortedOutput];
      }
      if (digit !== undefined) num = num * 10 + digit;
    }

    console.log(outputList, num);
    ans += num;
  }

  return ans;
};

function solve2(input) {
  return input
    .split('\n')
    .map((row) => row.split(' ').map((pattern) => [...pattern].sort()))
    .reduce((sum, row) => {
      let patterns = row.slice(0, 10);
      let output = row.slice(11).map((pattern) => pattern.join(''));

      let digits = [];

      digits[1] = patterns.find((pattern) => pattern.length === 2);
      digits[7] = patterns.find((pattern) => pattern.length === 3);
      digits[4] = patterns.find((pattern) => pattern.length === 4);
      digits[8] = patterns.find((pattern) => pattern.length === 7);

      digits[6] = patterns.find(
        (pattern) =>
          pattern.length === 6 &&
          digits[1].some((segment) => !pattern.includes(segment))
      );
      digits[0] = patterns.find(
        (pattern) =>
          pattern.length === 6 &&
          pattern !== digits[6] &&
          digits[4].some((segment) => !pattern.includes(segment))
      );
      digits[9] = patterns.find(
        (pattern) =>
          pattern.length === 6 && pattern !== digits[6] && pattern !== digits[0]
      );

      digits[3] = patterns.find(
        (pattern) =>
          pattern.length === 5 &&
          digits[1].every((segment) => pattern.includes(segment))
      );
      digits[5] = patterns.find(
        (pattern) =>
          pattern.length === 5 &&
          pattern.every((segment) => digits[6].includes(segment))
      );
      digits[2] = patterns.find(
        (pattern) =>
          pattern.length === 5 && pattern !== digits[3] && pattern !== digits[5]
      );

      digits = digits.map((pattern) => pattern.join(''));

      return (
        sum + Number(output.map((pattern) => digits.indexOf(pattern)).join(''))
      );
    }, 0);
}

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  // const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log('Unique segments = ', solve2(await readInput(INPUT_PATH)));
})();
