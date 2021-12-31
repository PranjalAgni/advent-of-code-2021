const path = require('path');
const { readInput, convertInputToList } = require('../helpers/data');

const convertInputToBingoObject = (inputData) => {
  const [numbers, ...boards] = inputData.split('\n');
  // console.log('numbers: ', numbers);
  // console.log('boards: ', boards);
  const rows = boards.length;
  const boards = [];
  let matrix = [];
  for (let rowPos = 1; rowPos < rows; rowPos++) {
    let row = boards[rowPos];
    if (row === '') {
    } else {
      row = row.split(' ').map((elt) => +elt);
      matrix.push(row);
    }
  }
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  convertInputToBingoObject(inputData);
})();
