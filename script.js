// Memory Game JavaScript

// Array of card symbols (pairs)
const cardSymbols = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cardsArray = [...cardSymbols, ...cardSymbols]; // Duplicate for pairs

// Game state variables
let flippedCards = [];
let matchedPairs = 0;

// DOM Elements
const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

// Shuffle function (Fisher-Yates algorithm)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create cards and add to game board
function createBoard() {
  gameBoard.innerHTML = ""; // Clear previous cards
  shuffle(cardsArray);

  cardsArray.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.card = symbol;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${symbol}</div>
      </div>
    `;

    // Add click event listener
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

// Handle card flip
function flipCard(card) {
  // Ignore already flipped cards
  if (card.classList.contains("flipped") || flippedCards.length === 2) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check if flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.card === card2.dataset.card) {
    // Matched pair
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === cardSymbols.length) {
      setTimeout(() => alert("Congratulations! You found all pairs!"), 500);
    }
  } else {
    // Not matched → flip back after delay
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Restart game
function restartGame() {
  flippedCards = [];
  matchedPairs = 0;
  createBoard();
}

// Event listener for restart button
restartBtn.addEventListener("click", restartGame);

// Initialize the game on page load
createBoard();
