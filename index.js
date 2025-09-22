// Jogo da Velha em JavaScript

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
let currentPlayer = 'X';
let movesCount = 0;
function printBoard() {
    console.log('\n');
    console.log('  0 1 2');
    board.forEach((row, index) => {
        console.log(index + ' ' + row.join('|'));
        if (index < 2) console.log('  -----');
    });
    console.log('\n');
}
function checkWin() {
    // Anáslise das linhas e colunas
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) return true;
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) return true;
    }
    // Análise das diagonais
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) return true;
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) return true;
    return false;
}
function checkDraw() {
    return movesCount === 9;
}
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
function askMove() {
    rl.question(`Player ${currentPlayer}, enter your move (row and column): `, (input) => {
        const [row, col] = input.split(' ').map(Number);
        if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === ' ') {
            board[row][col] = currentPlayer;
            movesCount++;
            printBoard();
            if (checkWin()) {
                console.log(`Player ${currentPlayer} wins!`);
                rl.close();
            } else if (checkDraw()) {
                console.log('The game is a draw!');
                rl.close();
            } else {
                switchPlayer();
                askMove();
            }
        } else {
            console.log('Invalid move. Try again.');
            askMove();
        }
    });
}
printBoard();
askMove();
// Inicia o jogo