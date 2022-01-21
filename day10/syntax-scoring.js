const path = require('path');
const { readInput } = require('../helpers/data');

const parseInput = (inputData) => {
  const rows = inputData.split('\n');
  const matrix = [];
  for (const row of rows) {
    const cols = row.split('');
    matrix.push(cols);
  }

  return matrix;
};

const isValidRow = (string) => {
  const stack = [];
  for (const symbol of string) {
    if (symbol === '(' || symbol === '{' || symbol === '[' || symbol === '<') {
      stack.push(symbol);
    } else {
      const matchingSymbol = stack.pop();
      if (
        !(
          (symbol === ']' && matchingSymbol === '[') ||
          (symbol === '}' && matchingSymbol === '{') ||
          (symbol === ')' && matchingSymbol === '(') ||
          (symbol === '>' && matchingSymbol === '<')
        )
      )
        return { isValid: false, symbol };
    }
  }

  return { isValid: true, symbol: null };
};

const solve = (data) => {
  const hashMap = new Map();
  let ans = 0;
  for (const row of data) {
    const { isValid, symbol } = isValidRow(row);
    if (!isValid) {
      if (!hashMap.has(symbol)) hashMap.set(symbol, 0);
      hashMap.set(symbol, hashMap.get(symbol) + 1);
    }
  }

  for (const [key, value] of hashMap.entries()) {
    console.log({ key, value });
    if (key === ')') {
      ans += value * 3;
    } else if (key === '}') {
      ans += value * 1197;
    } else if (key === ']') {
      ans += value * 57;
    } else if (key === '>') {
      ans += value * 25137;
    }
  }

  return ans;
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  const data = parseInput(inputData);
  console.log(solve(data));
})();
