const { getRookMoves } = require('../chessEngine/getMoves.js');
const Board = require('../chessEngine/chess.js');

describe('getRookMoves', () => {
    test('rook all alone', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 12; // white rook

        let moves = getRookMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(14);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 2], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 1], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 0], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 6], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 7], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [2, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [1, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [0, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [6, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [7, 4], capturedPeiceValue: -1});
    })
    test('rook enemies all close', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 12; // white rook

        board.board[4][3] = 22; // black rook
        board.board[4][5] = 22; // black rook
        board.board[4][2] = 22; // black rook
        board.board[4][6] = 22; // black rook
        board.board[3][4] = 22; // black rook
        board.board[5][4] = 22; // black rook
        board.board[2][4] = 22; // black rook
        board.board[6][4] = 22; // black rook

        let moves = getRookMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(4);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 5], capturedPeiceValue: 22});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 3], capturedPeiceValue: 22});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 4], capturedPeiceValue: 22});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 4], capturedPeiceValue: 22});
    })
    test('rook freinds all close', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 12; // white rook

        board.board[4][3] = 12; // white rook
        board.board[4][5] = 12; // white rook
        board.board[4][2] = 12; // white rook
        board.board[4][6] = 12; // white rook
        board.board[3][4] = 12; // white rook
        board.board[5][4] = 12; // white rook
        board.board[2][4] = 12; // white rook
        board.board[6][4] = 12; // white rook

        let moves = getRookMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(0);
    })
    test('edge case in corner', () => {
        let board = Board.createEmpty();

        board.board[0][0] = 12; // white rook

        let moves = getRookMoves(0, 0, 1, 2, board);
    
        expect(moves).toHaveLength(14);
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [0, 1], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [0, 2], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [0, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [0, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [0, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [0, 6], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [0, 7], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [1, 0], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [2, 0], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [3, 0], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [4, 0], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [5, 0], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [6, 0], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [7, 0], capturedPeiceValue: -1});
    })
    test('rook surronded', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 12; // white rook

        board.board[4][3] = 12; // white rook
        board.board[4][5] = 12; // white rook
        board.board[6][4] = 12; // white rook
        board.board[2][4] = 22; // black rook

        let moves = getRookMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(3);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [2, 4], capturedPeiceValue: 22});
    })
})
