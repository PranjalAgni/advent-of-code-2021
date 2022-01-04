const path = require('path');
const { readInput, convertInputToList } = require('../helpers/data');

const convertInputToBingoObject = (inputData) => {
  const [numbers, ...boards] = inputData.split('\n');
  const rows = boards.length;
  const ticketsList = [];
  let matrix = [];
  // console.log(boards);
  for (let rowPos = 1; rowPos < rows; rowPos++) {
    let row = boards[rowPos].trim();
    if (row === '') {
      ticketsList.push(matrix);
      matrix = [];
    } else {
      row = row
        .split(' ')
        .filter((elt) => elt != '')
        .map((elt) => +elt);
      matrix.push(row);
    }
  }

  ticketsList.push(matrix);
  return {
    numbers,
    ticketsList,
  };
};

const checkWinner = (ticketsList, winnersSet) => {
  const tickets = ticketsList.length;
  for (let ticketIdx = 0; ticketIdx < tickets; ticketIdx++) {
    const ticket = ticketsList[ticketIdx];
    const rows = ticket.length;
    let isFilled = false;
    // check for row
    for (let row = 0; row < rows; row++) {
      isFilled = true;
      for (let col = 0; col < ticket[row].length; col++) {
        if (ticket[row][col] !== -1) {
          isFilled = false;
          break;
        }
      }

      if (isFilled) return ticketIdx;
    }

    // check for column
    for (let col = 0; col < ticket[0].length; col++) {
      isFilled = true;
      for (let row = 0; row < rows; row++) {
        if (ticket[row][col] !== -1) {
          isFilled = false;
          break;
        }
      }

      if (isFilled) return ticketIdx;
    }
  }

  return -1;
};

const playBingo = (ticketsList, numbers) => {
  const winnersInfoList = [];
  const winnersSet = new Set();
  const tickets = ticketsList.length;
  for (const bingoNumber of numbers.split(',').map((elt) => +elt)) {
    for (let ticketIdx = 0; ticketIdx < tickets; ticketIdx++) {
      if (winnersSet.has(ticketIdx)) {
        continue;
      }
      const ticket = ticketsList[ticketIdx];
      const rows = ticket.length;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < ticket[row].length; col++) {
          if (bingoNumber === ticket[row][col]) {
            ticket[row][col] = -1;
            ticketsList[ticketIdx] = ticket;
          }
        }
      }
    }

    const winnerPosition = checkWinner(ticketsList, winnersSet);
    if (winnerPosition !== -1) {
      winnersSet.add(winnerPosition);
      console.log('winnersSet = ', winnersSet);
      winnersInfoList.push({ winnerPosition, bingoNumber });
    }
  }
  console.log(winnersInfoList);
  console.log(winnersInfoList[winnersInfoList.length - 1]);
  return winnersInfoList.pop();
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'small-input.txt');
  const inputData = await readInput(INPUT_PATH);
  const { ticketsList, numbers } = convertInputToBingoObject(inputData);
  console.log(ticketsList);
  const { winnerPosition, bingoNumber } = playBingo(ticketsList, numbers);
  let sum = 0;

  for (const row of ticketsList[winnerPosition]) {
    for (const elt of row) {
      if (elt !== -1) sum += elt;
    }
  }

  console.log('Your answer = ', sum * bingoNumber);
})();
