// The gameboard represents the state of the game
function gameboard() {
    const board = [];

    // Create a 2D array that will reperesent the game board
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++) {
            board[i].push(cell());
        }
    }

    // Getter function to retrieve the board through closure
    const getBoard = () => board;

    // Add player's token to the board
    const addMove = (x, y, player) => {
        const box = board[x][y];

        if (box.getValue() == 0) {
            box.addToken(player);
            return 1;
        }
        
        return;
    };

    // Print board to console
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return {
        addMove,
        getBoard, 
        printBoard
    };
}

/*
A cell represents a box in the game board and can have one of three values:
0: Box is empty
1: Player 1's token
2: Player 2's token
*/
function cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
}

// Check if there is a winner or a tie
function checkGameState(board) {
    let emptyBoxCount = 0;

    for (let i = 0; i < 3; i++) {
        // Updates counter for available boxes left
        for (let j = 0; j < 3; j++) {
            emptyBoxCount += board[i][j].getValue() === 0 ? 1 : 0;
        }

        // Check rows
        if (checkLine(board[i][0].getValue(), board[i][1].getValue(), board[i][2].getValue())) return board[i][0].getValue();
        // Check columns
        if (checkLine(board[0][i].getValue(), board[1][i].getValue(), board[2][i].getValue())) return board[i][0].getValue();
    }

    // Check diagonals
    if (checkLine(board[0][0].getValue(), board[1][1].getValue(), board[2][2].getValue())) return board[0][0].getValue();
    if (checkLine(board[0][2].getValue(), board[1][1].getValue(), board[2][0].getValue())) return board[0][2].getValue();

    // Check for available boxes
    if (emptyBoxCount === 0) return 3;
}

// Check if a line of tokens are matching
function checkLine(a, b, c) {
    return a !== 0 && a === b && b === c;
}

// The gameController controls flow of the game
function gameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const playRound = (x, y) => {
        // Check if selected box is available
        if (!board.addMove(x, y, getActivePlayer().token)) {
            console.log("Cannot choose that box");
            return;
        }

        // Check for a winner or tie
        const gameState = checkGameState(board.getBoard()); 
    
        if (gameState === 1 || gameState === 2) {
            console.log(`${players[gameState - 1].name} has won!`);
        }
        else if (gameState === 3) {
            console.log("Tie!");
        }
        
        switchPlayerTurn();
        board.printBoard();
    }

    board.printBoard();
    
    return {
        playRound,
        getActivePlayer,
    };
}

const game = gameController();