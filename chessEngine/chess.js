Board = {
    board: [],
    canCastle: [0, 0, 0, 0], // wl, wr, bl, br
};

function main() {

}

function createBoard() {
    board = new Board();
    board.board = [
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
}