const Board = require("./chess");

function createMove(originalPosition, newPosition, capturedPeiceValue) {
    return {
        originalPosition: originalPosition,     // [0] == i, [1] == j
        newPosition: newPosition,               // [0] == i, [1] == j
        capturedPeiceValue: capturedPeiceValue, // int: the captured peice value (e.g., 12 <- white rook), if -1 then no captured peice
    };
}

function getAllMoves(board, colour) {
    let allMoves = [];
    let enemyColour = 3 - colour; //white: 1,  black: 2  -> 3 - white = 2 = black
    for (let i = 0; i < board.board.length; i++) {
        for (let j = 0; j < board.board[i].length; j++) {
            if(board.board[i][j] == 0 || Math.floor(board.board[i][j] / 10) != colour) {
                continue;
            } 

            switch(board.board[i][j][1] % 10) {
                case 1:
                    allMoves.push(getPawnMoves(i, j, colour, enemyColour, board));
                case 2:
                    allMoves.push(getRookMoves(i, j, colour, enemyColour, board));
                case 3:
                    allMoves.push(getHorseMoves(i, j, colour, enemyColour, board));
                case 4:
                    allMoves.push(getBishopMoves(i, j, colour, enemyColour, board));
                case 5:
                    allMoves.push(getRookMoves(i, j, colour, enemyColour, board));
                    allMoves.push(getBishopMoves(i, j, colour, enemyColour, board));
                case 6:
                    allMoves.push(getKingMoves(i, j, colour, enemyColour, board));
                default:
                    console.error(`Piece type incorrect, got ${board.board[i][j][1]}`);
            }
        }
    }
}

function getPawnMoves(i, j, colour, enemyColour, board) {
    const moves = [];

    let canDouble = ((i == 1 && colour == 1)||(i == 7 && colour == 2)) ? true : false;
    let dir = (colour == 1) ? 1 : -1;
    
    if(i + dir >= 8 || i + dir <= -1) {
        return moves;
    }

    if(board.board[i + dir][j] == 0) {
        m = createMove([i, j], [i + dir, j], -1);
        moves.push(m);

        if(canDouble == true && (i + dir * 2 <= 7 || i + dir * 2 >= 0)) {
            if(board.board[i + dir * 2][j] == 0) {
                m = createMove([i, j], [i + dir * 2, j], -1);
                moves.push(m);
            }
        }
    }

    if(j + 1 <= 7) {
        if(Math.floor(board.board[i + dir][j + 1] / 10) == enemyColour) {
            m = createMove([i, j], [i + dir, j + 1], board.board[i + dir][j + 1]);
            moves.push(m);
        } 
    }

    if(j - 1 >= 0) {
        if(Math.floor(board.board[i + dir][j - 1] / 10) == enemyColour) {
            m = createMove([i, j], [i + dir, j - 1], board.board[i + dir][j - 1]);
            moves.push(m);
        } 
    }

    return moves;
}

function getRookMoves(i, j, colour, enemyColour, board) {
    const moves = [];

    let dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let newI;
    let newJ;

    for (let x = 0; x < dirs.length; x++) {
        newI = i;
        newJ = j;
        while (true) {
            newI = newI + dirs[x][0];
            newJ = newJ + dirs[x][1];
            if(newI >= 8 || newI <= -1 || newJ >= 8 || newJ <= -1) {
                break;
            }
            if(board.board[newI][newJ] == 0) {
                m = createMove([i, j], [newI, newJ], -1);
                moves.push(m);
            }
            if(Math.floor(board.board[newI][newJ] / 10) == enemyColour) {
                m = createMove([i, j], [newI, newJ], board.board[newI][newJ]);
                moves.push(m);
                break;
            } 
            if(Math.floor(board.board[newI][newJ] / 10) == colour) {
                break;
            } 
        }
    }
    return moves;
}

function getHorseMoves(i, j, colour, enemyColour, board) {
    const moves = [];

    let dirs = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]
    let newI;
    let newJ;

    for (let x = 0; x < dirs.length; x++) {
        newI = i + dirs[x][0];
        newJ = j + dirs[x][1];
        if(newI >= 8 || newI <= -1 || newJ >= 8 || newJ <= -1) {
            continue;
        }
        if(board.board[newI][newJ] == 0) {
            m = createMove([i, j], [newI, newJ], -1);
            moves.push(m);
            continue;
        }
        if(Math.floor(board.board[newI][newJ] / 10) == enemyColour) {
            m = createMove([i, j], [newI, newJ], board.board[newI][newJ]);
            moves.push(m);
            continue;
        } 
    }
    return moves;
}

function getBishopMoves(i, j, colour, enemyColour, board) {
    const moves = [];

    let dirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    let newI;
    let newJ;

    for (let x = 0; x < dirs.length; x++) {
        newI = i;
        newJ = j;
        while (true) {
            newI = newI + dirs[x][0];
            newJ = newJ + dirs[x][1];
            if(newI >= 8 || newI <= -1 || newJ >= 8 || newJ <= -1) {
                break;
            }
            if(board.board[newI][newJ] == 0) {
                m = createMove([i, j], [newI, newJ], -1);
                moves.push(m);
            }
            if(Math.floor(board.board[newI][newJ] / 10) == enemyColour) {
                m = createMove([i, j], [newI, newJ], board.board[newI][newJ]);
                moves.push(m);
                break;
            } 
            if(Math.floor(board.board[newI][newJ] / 10) == colour) {
                break;
            } 
        }
    }
    return moves;
}

function getKingMoves(i, j, colour, enemyColour, board) {
    const moves = [];

    let dirs = [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1]]
    let newI;
    let newJ;

    for (let x = 0; x < dirs.length; x++) {
        newI = i + dirs[x][0];
        newJ = j + dirs[x][1];
        if(newI >= 8 || newI <= -1 || newJ >= 8 || newJ <= -1) {
            continue;
        }
        if(board.board[newI][newJ] == 0) {
            m = createMove([i, j], [newI, newJ], -1);
            moves.push(m);
            continue;
        }
        if(Math.floor(board.board[newI][newJ] / 10) == enemyColour) {
            m = createMove([i, j], [newI, newJ], board.board[newI][newJ]);
            moves.push(m);
            continue;
        } 
    }
    return moves;
}

function isMoveLegal(board, move, colour, kingI, kingJ) {
    const newBoard = board.clone();
    newBoard.Board[move.newPosition] = newBoard.Board[move.originalPosition];
    newBoard.Board[move.originalPosition] = 0;
    return !isKingInCheck(newBoard, colour, kingI, kingJ);
}

function isKingInCheck(board, colour, kingI, kingJ) {
    let enemyMoves = getAllMoves(board, 3 - colour);
    for(let i = 0; i < enemyMoves.length; i++) {
        if(enemyMoves[i].newPosition == [kingI, kingJ]) {
            return true;
        }
    }
    return false;
} 

function getKingPos(board, colour) {    
    for (let i = 0; i < board.board.length; i++) {
        for (let j = 0; j < board.board[i].length; j++) {
            if(board.board[i][j] == `${colour}6`) {
                return (i, j);
            }
        }
    }
    console.error("King was not found");
}

function getAllLegalMoves(board, colour) {
    let allMoves = getAllMoves(board, colour);
    let kingI, kingJ = getKingPos(board, colour);
    let allLegalMoves = [];
    for(let m = 0; m < allMoves.length; m++) {
        if(isMoveLegal(board, allMoves[m], colour, kingI, kingJ) == true) {
            allLegalMoves.push(allMoves[m]);
        }
    }   
    return allLegalMoves;
}

module.exports = {
    getPawnMoves,
    getHorseMoves,
    getRookMoves,
    getBishopMoves,
    getKingMoves,
    createMove,
    getAllLegalMoves,
};