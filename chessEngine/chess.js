const Board = {
    board: [],
    canCastle: [], 

    initialise() {
        this.board = [
            [12, 13, 14, 15, 16, 14, 13, 12],
            [11, 11, 11, 11, 11, 11, 11, 11],
            [ 0,  0,  0,  0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0,  0,  0,  0],
            [21, 21, 21, 21, 21, 21, 21, 21],
            [22, 23, 24, 25, 26, 24, 23, 22],
        ]
        //index (0, 0) is A1 in chess board
        //each piece is has colour type
        //e.g., 21 is black pawn
        // Colour: 1 = white, 2 = black
        //Type: 1 = pawn, 2 = rook, 3 = horse, 4 = bishop, 5 = queen, 6 = king

        this.canCastle = [[true, true], [true, true]]
        //can castle is 4 flags 
        //canCastle[0]: white flags, canCastle[1]: black flags
        //canCastle[:, 0]: left side castle, canCastle[:, 1]: right side castle
    
        return this;
    },

    printBoard() {
        for (let i = this.board.length - 1; i > -1; i--) {
            let s = "";
            for (let j = 0; j < this.board[i].length; j++) {
                if(this.board[i][j] == 0) {
                    s = s + " 00 ";
                } else {
                    s = s + ` ${this.board[i][j]} `;
                }
            }
            console.log(s)
        }
    },
};


function main() {
    let board = Board.initialise();
    board.printBoard();
}

main()

//to run: node chessEngine/chess.js