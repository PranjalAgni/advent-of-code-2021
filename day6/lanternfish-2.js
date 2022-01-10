const path = require('path');
const { readInput } = require('../helpers/data');

const toMap = (data) => {
  const hashMap = new Map();
  data.forEach((d) => {
    if (!hashMap.has(d)) {
      hashMap.set(d, 0);
      fish.push(d);
    }
    hashMap.set(d, hashMap.get(d) + 1);
  });

  return hashMap;
};

const incrementMap = (map, timer, count) => {
  map.set(timer, count);
};
const solve = (data, days) => {
  const fishMap = toMap(data);

  for (let day = 0; day < days; day++) {
    let N = fish.length;
    const nextMap = new Map();
    for (const [timer, count] of fishMap) {
      if (timer > 0) {
        incrementMap(nextMap, timer - 1, count);
      } else {
        incrementMap(nextMap, 6, count);
        incrementMap(nextMap, 8, nextMap.has(8) ? nextMap.get(8) : 1);
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
