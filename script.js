const cells = document.querySelectorAll(".cell");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let currentPrediction = null;  // Stores the current player's prediction
let predictionSubmitted = false;  // Flag to ensure prediction is made before the turn

// Function to update the board visually
function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Function to handle a click on the board
function handleClick(e) {
    const index = e.target.getAttribute("data-index");

    // Ensure a move is made only if the cell is empty and the prediction was submitted
    if (board[index] === "" && predictionSubmitted) {
        board[index] = currentPlayer;
        updateBoard();

        // Check if the prediction was correct
        checkPrediction(index);

        // Check if there is a winner after the move
        if (!checkWinner()) {
            // Switch turn to the other player
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            predictionSubmitted = false;  // Reset prediction flag for the next turn
        }
    } else {
        alert("You must submit a prediction before making your move!");
    }
}

// Function to check if the current player's prediction was correct
function checkPrediction(opponentMove) {
    if (currentPrediction === opponentMove) {
        setTimeout(() => {
            alert(`Player ${currentPlayer === "X" ? "O" : "X"} predicted correctly! Player ${currentPlayer} loses.`);
            resetGame();
        }, 100);
    }
}

// Function to handle the prediction submission
function handlePrediction() {
    const predictionInput = document.getElementById("prediction");
    const prediction = parseInt(predictionInput.value);

    // Ensure prediction is valid and in range
    if (prediction >= 0 && prediction <= 8 && board[prediction] === "") {
        currentPrediction = prediction;
        predictionSubmitted = true;
        alert(`Player ${currentPlayer} predicted that Player ${currentPlayer === "X" ? "O" : "X"} will move to cell ${prediction}.`);
    } else {
        alert("Invalid prediction! Choose an empty cell between 0 and 8.");
    }
}

// Function to check for a winner
function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            setTimeout(() => {
                alert(`Player ${board[a]} wins!`);
                resetGame();
            }, 100);
            return true;
        }
    }

    if (!board.includes("")) {
        setTimeout(() => {
            alert("It's a draw!");
            resetGame();
        }, 100);
        return true;
    }

    return false;
}

// Function to reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    currentPrediction = null;
    predictionSubmitted = false;
    updateBoard();
}

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

// Event listener for submitting predictions
document.getElementById("submit-prediction").addEventListener("click", handlePrediction);

// Reset button functionality
document.getElementById("reset").addEventListener("click", resetGame);
