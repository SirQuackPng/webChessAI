const { getAllLegalMoves } = require('../chessEngine/getMoves.js');

function createValue(originalPosition, newPosition, score) {
    return {
        originalPosition: originalPosition,     // [0] == i, [1] == j
        newPosition: newPosition,               // [0] == i, [1] == j
        score: score,
    };
}

const typeDict = [0, 100, 500, 300, 350, 800, 1000000];

function evaluate(board) {
    let summ = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if(board.board[i][j] == 0) {
                continue;
            }
            let colour = (Math.floor(colour/10) == 1) ? 1 : -1;
            let type = colour % 10;
            summ += typeDict[type] * colour;
        }
    }
    return summ / 100;
}

function minmax(board, colour, maxDepth) {
    if(colour == 1) {
        max(board, colour, depth, maxDepth);
    } else {
        min(board, colour, depth, maxDepth);
    }
}

function min(board, colour, depth, maxDepth) {
    if(depth == maxDepth) {
        return createValue(-1, -1, evaluate(board));
    }
    let moves = getAllLegalMoves(board, colour);
    best = createValue(-1, -1, Infinity);
    for(move in moves) {
        let capturedPiece = board.board[moves.newPosition[0]][moves.newPosition[1]];
        board.board[moves.newPosition[0]][moves.newPosition[1]] = board.board[moves.originalPosition[0]][moves.originalPosition[1]];
        board.board[moves.originalPosition[0]][moves.originalPosition[1]] = 0;

        let vals = max(board, 3 - colour, depth + 1, maxDepth);

        board.board[moves.originalPosition[0]][moves.originalPosition[1]] = board.board[moves.newPosition[0]][moves.newPosition[1]];
        board.board[moves.newPosition[0]][moves.newPosition[1]] = capturedPiece;

        if(vals.score < best.score) {
            best.originalPosition = move.originalPosition;
            best.newPosition = move.newPosition;
            best.score = vals.score;
        }
    }
    return best;
}

function max(board, colour, depth, maxDepth) {
    if(depth == maxDepth) {
        return createValue(-1, -1, evaluate(board));
    }
    let moves = getAllLegalMoves(board, colour);
    best = createValue(-1, -1, -Infinity);
    for(move in moves) {
        let capturedPiece = board.board[moves.newPosition[0]][moves.newPosition[1]];
        board.board[moves.newPosition[0]][moves.newPosition[1]] = board.board[moves.originalPosition[0]][moves.originalPosition[1]];
        board.board[moves.originalPosition[0]][moves.originalPosition[1]] = 0;

        let vals = min(board, 3 - colour, depth + 1, maxDepth);

        board.board[moves.originalPosition[0]][moves.originalPosition[1]] = board.board[moves.newPosition[0]][moves.newPosition[1]];
        board.board[moves.newPosition[0]][moves.newPosition[1]] = capturedPiece;

        if(vals.score > best.score) {
            best.originalPosition = move.originalPosition;
            best.newPosition = move.newPosition;
            best.score = vals.score;
        }
    }
    return best;
}