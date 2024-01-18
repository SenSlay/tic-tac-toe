// The Gameboard represents the state of the game
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

    // Adds player's token to the board
    const addMove = (x, y, player) => {
        const box = board[x][y];

        if (box.getValue() == 0) {
            box.addToken(player);
        }
    };

    // Prints board to console
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
A Cell represents a box in the game board and can have one of three values:
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