// The Gameboard represents the state of the game
function Gameboard() {
    const board = [];

    // Create a 2D array that will reperesent the game board
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }

    // Getter function to retrieve the board through closure
    const getBoard = () => board;

    // Prints board to console
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return {
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
function Cell() {
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