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
        return { isValid: false, stack: null };
    }
  }

  return { isValid: true, stack };
};

const solve = (data) => {
  const scores = [];
  for (const row of data) {
    const { isValid, stack } = isValidRow(row);
    if (isValid) {
      let totalScore = 0;
      while (stack.length > 0) {
        const symbol = stack.pop();
        totalScore *= 5;
        if (symbol === '(') {
          totalScore += 1;
        } else if (symbol === '{') {
          totalScore += 3;
        } else if (symbol === '[') {
          totalScore += 2;
        } else if (symbol === '<') {
          totalScore += 4;
        }
      }

      scores.push(totalScore);
    }
  }

  scores.sort((a, b) => (a < b ? -1 : 1));
  return scores[Math.floor(scores.length / 2)];
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  const data = parseInput(inputData);
  console.log(solve(data));
})();
