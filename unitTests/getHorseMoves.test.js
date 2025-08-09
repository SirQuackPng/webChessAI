const { getHorseMoves } = require('../chessEngine/getMoves.js');
const Board = require('../chessEngine/chess.js');

describe('getHorseMoves', () => {
    test('horse all alone', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 13; // white horse

        let moves = getHorseMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(8);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [6, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [6, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [2, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [2, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 6], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 2], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 6], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 2], capturedPeiceValue: -1});
    })
    test('horse friends in ever position', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 13; // white horse

        board.board[6][3] = 13; // white horse
        board.board[6][5] = 13; // white horse
        board.board[2][3] = 13; // white horse
        board.board[2][5] = 13; // white horse
        board.board[3][6] = 13; // white horse
        board.board[3][2] = 13; // white horse
        board.board[5][6] = 13; // white horse
        board.board[5][2] = 13; // white horse

        let moves = getHorseMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(0);
    })
    test('horse enemies in ever position', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 13; // white horse

        board.board[6][3] = 23; // black horse
        board.board[6][5] = 23; // black horse
        board.board[2][3] = 23; // black horse
        board.board[2][5] = 23; // black horse
        board.board[3][6] = 23; // black horse
        board.board[3][2] = 23; // black horse
        board.board[5][6] = 23; // black horse
        board.board[5][2] = 23; // black horse

        let moves = getHorseMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(8);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [6, 3], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [6, 5], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [2, 3], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [2, 5], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 6], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 2], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 6], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 2], capturedPeiceValue: 23});
    })
    test('edge case in corner', () => {
        let board = Board.createEmpty();

        board.board[0][0] = 13; // white horse

        let moves = getHorseMoves(0, 0, 1, 2, board);
    
        expect(moves).toHaveLength(2);
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [2, 1], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [1, 2], capturedPeiceValue: -1});
    })
})

