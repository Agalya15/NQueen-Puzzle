let boardSize = 4;
let queens = []; // store all queen positions as {row, col}

function startGame() {
  boardSize = parseInt(document.getElementById('nValue').value);
  queens = [];
  drawBoard();
  document.getElementById('status').innerText = 'Place your queens!';
}

function drawBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  board.style.width = `${boardSize * 50}px`;

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');

      if (queens.some(q => q.row === row && q.col === col)) {
        cell.classList.add('queen');
      }

      cell.addEventListener('click', () => toggleQueen(row, col));
      board.appendChild(cell);
    }
  }
}

function toggleQueen(row, col) {
  const index = queens.findIndex(q => q.row === row && q.col === col);
  if (index >= 0) {
    queens.splice(index, 1); // remove queen if clicked again
  } else {
    queens.push({ row, col });
  }

  drawBoard();
  checkGameStatus();
}

function checkGameStatus() {
  if (queens.length < boardSize) {
    document.getElementById('status').innerText = `Queens placed: ${queens.length}/${boardSize}`;
    return;
  }

  if (isValidBoard()) {
    document.getElementById('status').innerText = "Won!!!";
  } else {
    document.getElementById('status').innerText = "Queens are attacking each other, Try again!";
  }
}

function isValidBoard() {
  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      if (queens[i].row === queens[j].row) return false;
      if (queens[i].col === queens[j].col) return false;
      if (Math.abs(queens[i].row - queens[j].row) === Math.abs(queens[i].col - queens[j].col)) return false;
    }
  }
  return true;
}
