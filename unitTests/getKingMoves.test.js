const { getKingMoves } = require('../chessEngine/getMoves.js');
const Board = require('../chessEngine/chess.js');

describe('getKingMoves', () => {
    test('king all alone', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 16; // white king

        let moves = getKingMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(8);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 5], capturedPeiceValue: -1});
    })
    test('king friends in ever position', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 16; // white king

        board.board[5][3] = 13; // white horse
        board.board[5][4] = 13; // white horse
        board.board[5][5] = 13; // white horse
        board.board[4][3] = 13; // white horse
        board.board[4][5] = 13; // white horse
        board.board[3][3] = 13; // white horse
        board.board[3][4] = 13; // white horse
        board.board[3][5] = 13; // white horse

        let moves = getKingMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(0);
    })
    test('king enemies in ever position', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 16; // white king

        board.board[5][3] = 23; // white horse
        board.board[5][4] = 23; // white horse
        board.board[5][5] = 23; // white horse
        board.board[4][3] = 23; // white horse
        board.board[4][5] = 23; // white horse
        board.board[3][3] = 23; // white horse
        board.board[3][4] = 23; // white horse
        board.board[3][5] = 23; // white horse

        let moves = getKingMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(8);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 3], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 4], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 5], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 3], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [4, 5], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 3], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 4], capturedPeiceValue: 23});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 5], capturedPeiceValue: 23});
    })
    test('edge case in corner', () => {
        let board = Board.createEmpty();

        board.board[0][0] = 16; // white king

        let moves = getKingMoves(0, 0, 1, 2, board);
    
        expect(moves).toHaveLength(3);
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [1, 0], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [1, 1], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [0, 1], capturedPeiceValue: -1});
    })
})

