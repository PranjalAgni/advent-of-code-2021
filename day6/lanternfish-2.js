const path = require('path');
const { readInput } = require('../helpers/data');

const toMap = (data) => {
  const hashMap = new Map();
  data.forEach((d) => {
    if (!hashMap.has(d)) {
      hashMap.set(d, 0);
    }
    hashMap.set(d, hashMap.get(d) + 1);
  });

  return hashMap;
};

const incrementMap = (map, timer, count) => {
  if (!map.has(timer)) map.set(timer, 0);
  map.set(timer, map.get(timer) + count);
};
const solve = (data, days) => {
  let fishMap = toMap(data);

  for (let day = 0; day < days; day++) {
    const nextMap = new Map();
    for (const [timer, count] of fishMap) {
      if (timer > 0) {
        incrementMap(nextMap, timer - 1, count);
      } else {
        incrementMap(nextMap, 6, count);
        incrementMap(nextMap, 8, count);
      }
    }

    fishMap = nextMap;
  }

  let answer = 0;
  for (const [_timer, count] of fishMap) {
    answer += count;
  }
  return answer;
};
(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  const data = inputData.split(',').map(Number);
  console.log(solve(data, 256));
})();
