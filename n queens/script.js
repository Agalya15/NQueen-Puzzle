let boardSize = 4;
let boardState = [];

function startGame() {
  boardSize = parseInt(document.getElementById('nValue').value);
  boardState = Array(boardSize).fill(-1);
  drawBoard();
  document.getElementById('status').innerText = 'Place your queens!';
}

function drawBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  board.style.width = `${boardSize * 50}px`; // Ensures square grid

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
      if (boardState[row] === col) cell.classList.add('queen');

      cell.addEventListener('click', () => toggleQueen(row, col));
      board.appendChild(cell);
    }
  }
}

function toggleQueen(row, col) {
  if (boardState[row] === col) {
    boardState[row] = -1;
  } else {
    boardState[row] = col;
  }

  drawBoard();
  checkGameStatus();
}

function checkGameStatus() {
  const placed = boardState.filter(c => c !== -1).length;

  if (placed < boardSize) {
    document.getElementById('status').innerText = `Queens placed: ${placed}/${boardSize}`;
    return;
  }

  if (isValidBoard()) {
    document.getElementById('status').innerText = "🎉 You Win! All queens are safe!";
  } else {
    document.getElementById('status').innerText = "❌ Queens are attacking each other. Try again!";
  }
}

function isValidBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = i + 1; j < boardSize; j++) {
      if (boardState[i] === boardState[j]) return false;
      if (Math.abs(boardState[i] - boardState[j]) === Math.abs(i - j)) return false;
    }
  }
  return true;
}
