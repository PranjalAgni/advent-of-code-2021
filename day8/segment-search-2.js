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
        if (!charactersMapping[signal[idx]])
          charactersMapping[signal[idx]] = [];
        const mappingList = charactersMapping[signal[idx]];
        mappingList.push(targetSegment[idx]);
        charactersMapping[signal[idx]] = mappingList;
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

(async () => {
  const INPUT_PATH = path.join(__dirname, 'small-input.txt');
  const inputList = convertInputToList(await readInput(INPUT_PATH));
  console.log('Unique segments = ', solve(inputList));
})();

//
//
// a: f
// f: b
// d: g
// g: e
// c: a
// e: d
// b: c

// acedgfb
// fadgebc

// cefdb
// { f: 'b', a: 'f', c: 'a', g: 'e', d: 'g', b: 'c', e: 'd' }
// adbgc
