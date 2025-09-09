const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// winning combos (index positions in grid)
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  // ignore if already filled or game is over
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.innerText = currentPlayer;
  e.target.classList.add("taken");

  if (checkWin()) {
    statusText.innerText = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.innerText = "🤝 It's a Draw!";
    gameActive = false;
    return;
  }

  // switch turns
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "Player X's turn";
  cells.forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("taken");
  });
}

// event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
