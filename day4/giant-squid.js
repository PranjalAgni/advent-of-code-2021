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

  return {
    numbers,
    ticketsList,
  };
};

const checkWinner = (ticketsList) => {
  const tickets = ticketsList.length;
  for (let ticketIdx = 0; ticketIdx < tickets; ticketIdx++) {
    const ticket = ticketsList[ticketIdx];
    const rows = ticket.length;
    let isFilled = false;
    // check for column
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

    // check for row
    for (let col = 0; col < ticket[0].length; col++) {
      isFilled = true;
      for (let row = 0; row < ticket.length; row++) {
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
  const tickets = ticketsList.length;
  for (const bingoNumber of numbers.split(',').map((elt) => +elt)) {
    for (let ticketIdx = 0; ticketIdx < tickets; ticketIdx++) {
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

    const winnerPosition = checkWinner(ticketsList);
    if (winnerPosition !== -1) {
      return { winnerPosition, bingoNumber };
    }
  }
  return { winnerPosition: -1, bingoNumber: -1 };
};

(async () => {
  const INPUT_PATH = path.join(__dirname, 'input.txt');
  const inputData = await readInput(INPUT_PATH);
  const { ticketsList, numbers } = convertInputToBingoObject(inputData);
  const { winnerPosition, bingoNumber } = playBingo(ticketsList, numbers);
  let sum = 0;
  for (const row of ticketsList[winnerPosition]) {
    for (const elt of row) {
      if (elt !== -1) sum += elt;
    }
  }

  console.log('Your answer = ', sum * bingoNumber);
})();
