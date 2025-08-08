const Move = {
    originalPosition: [], // [0] == i, [1] == j
    newPosition: [],      // [0] == i, [1] == j
    capturedPeiceValue,   // int: the captured peice value (e.g., 12 <- white rook), if -1 then no captured peice

    initialise(originalPosition, newPosition, capturedPeiceValue) {
        self.originalPosition = originalPosition;
        self.newPosition = newPosition;
        self.capturedPeiceValue = capturedPeiceValue;
        return this;
    }
}

function getAllMoves(board, colour) {
    let enemyColour = 3 - colour; //white: 1,  black: 2  -> 3 - white = 2 = black
    for (let i = 0; i < board[i].length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if(board[i][j] == 0 || board[i][j][0] != colour) {
                continue;
            } 

            switch(board[i][j][1]) {  // board[i][j][1] will get the 2nd digit (e.g., board[i][j] = 12, board[i][j][1] = 2)
                case 1:
                    getPawnMoves(i, j, colour, enemyColour, board);
                case 2:
                    getRookMoves(i, j, colour, enemyColour, board);
                case 3:
                    getHorseMoves(i, j, colour, enemyColour, board);
                case 4:
                    getBishopMoves(i, j, colour, enemyColour, board);
                case 5:
                    getQueenMoves(i, j, colour, enemyColour, board);
                case 6:
                    getKingMoves(i, j, colour, enemyColour, board);
                default:
                    console.error(`Piece type incorrect, got ${board[i][j][1]}`);
            }
        }
    }
}

function getPawnMoves(i, j, colour, enemyColour, board) {
    const moves = [];

    let canDouble = ((i == 1 && colour == 1)||(i == 7 && colour == 2)) ? true : false;
    let dir = (colour == 1) ? 1 : -1;

    if(board[i + dir][j] == 0) {
        m = Move.initialise([i, j], [i + dir][j], -1);
        moves.push(m);

        if(canDouble == true) {
            if(board[i + dir * 2][j] == 0) {
                m = Move.initialise([i, j], [i + dir * 2][j], -1);
                moves.push(m);
            }
        }
    }

    if(board[i + dir][j + 1][0] == enemyColour) {
        m = Move.initialise([i, j], [i + dir][j + 1], board[i + dir][j + 1]);
        moves.push(m);
    } 

    if(board[i + dir][j - 1][0] == enemyColour) {
        m = Move.initialise([i, j], [i + dir][j - 1], board[i + dir][j - 1]);
        moves.push(m);
    } 

    return moves;
}