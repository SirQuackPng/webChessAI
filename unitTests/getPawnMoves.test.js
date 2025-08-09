const { getPawnMoves } = require('../chessEngine/getMoves.js');
const Board = require('../chessEngine/chess.js');

describe('getPawnMoves', () => {
    test('pawn can only move 1 step forward', () => {
        let board = Board.createEmpty();

        board.board[1][2] = 11; // white pawn
        board.board[3][2] = 23; // black horse

        let moves = getPawnMoves(1, 2, 1, 2, board);
    
        expect(moves).toHaveLength(1);
        expect(moves).toContainEqual({originalPosition: [1, 2], newPosition: [2, 2], capturedPeiceValue: -1});
    })
    test('white pawn can move 2 steps forward', () => {
        let board = Board.createEmpty();

        board.board[1][2] = 11; // white pawn

        let moves = getPawnMoves(1, 2, 1, 2, board);
    
        expect(moves).toHaveLength(2);
        expect(moves).toContainEqual({originalPosition: [1, 2], newPosition: [2, 2], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [1, 2], newPosition: [3, 2], capturedPeiceValue: -1});
    })
    test('black pawn can move 2 steps forward', () => {
        let board = Board.createEmpty();

        board.board[7][2] = 21; // black pawn

        let moves = getPawnMoves(7, 2, 2, 1, board);
    
        expect(moves).toHaveLength(2);
        expect(moves).toContainEqual({originalPosition: [7, 2], newPosition: [6, 2], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [7, 2], newPosition: [5, 2], capturedPeiceValue: -1});
    })
    test('pawn move forward blocked', () => {
        let board = Board.createEmpty();

        board.board[1][2] = 11; // white pawn
        board.board[2][2] = 23; // black horse

        let moves = getPawnMoves(1, 2, 1, 2, board);
    
        expect(moves).toHaveLength(0);
    })
    test('pawn can take', () => {
        let board = Board.createEmpty();

        board.board[1][2] = 11; // white pawn

        board.board[2][1] = 21; // black pawn
        board.board[2][2] = 23; // black horse
        board.board[2][3] = 25; // black queen

        let moves = getPawnMoves(1, 2, 1, 2, board);
    
        expect(moves).toHaveLength(2);
        expect(moves).toContainEqual({originalPosition: [1, 2], newPosition: [2, 1], capturedPeiceValue: 21});
        expect(moves).toContainEqual({originalPosition: [1, 2], newPosition: [2, 3], capturedPeiceValue: 25});
    })    
    test('pawn cannot take', () => {
        let board = Board.createEmpty();

        board.board[1][2] = 11; // white pawn

        board.board[2][1] = 11; // white pawn
        board.board[2][2] = 13; // white horse
        board.board[2][3] = 15; // white queen

        let moves = getPawnMoves(1, 2, 1, 2, board);
    
        expect(moves).toHaveLength(0);
    }) 
    test('edge case where enemy is at index 7', () => {
        let board = Board.createEmpty();

        board.board[2][0] = 11; // white pawn

        board.board[3][0] = 11; // white pawn
        board.board[3][1] = 13; // white horse
        board.board[3][7] = 25; // black queen

        let moves = getPawnMoves(2, 0, 1, 2, board);
    
        expect(moves).toHaveLength(0);
    }) 
    test('edge case where enemy is at index 0', () => {
        let board = Board.createEmpty();

        board.board[2][7] = 11; // white pawn

        board.board[3][7] = 11; // white pawn
        board.board[3][6] = 13; // white horse
        board.board[3][0] = 25; // black queen

        let moves = getPawnMoves(2, 7, 1, 2, board);
    
        expect(moves).toHaveLength(0);
    }) 
})

