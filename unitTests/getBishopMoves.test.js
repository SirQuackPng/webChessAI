const { getBishopMoves } = require('../chessEngine/getMoves.js');
const Board = require('../chessEngine/chess.js');

describe('getBishopMoves', () => {
    test('bishop all alone', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 14; // white bishop

        let moves = getBishopMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(13);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [2, 2], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [1, 1], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [0, 0], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [6, 6], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [7, 7], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [2, 6], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [1, 7], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [6, 2], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [7, 1], capturedPeiceValue: -1});
    })
    test('bishop enemies all close', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 14; // white bishop

        board.board[3][3] = 22; // black rook
        board.board[2][2] = 22; // black rook
        board.board[5][5] = 22; // black rook
        board.board[6][6] = 22; // black rook
        board.board[3][5] = 22; // black rook
        board.board[2][6] = 22; // black rook
        board.board[5][3] = 22; // black rook
        board.board[6][2] = 22; // black rook

        let moves = getBishopMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(4);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 3], capturedPeiceValue: 22});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 5], capturedPeiceValue: 22});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 5], capturedPeiceValue: 22});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 3], capturedPeiceValue: 22});
    })
    test('bishop freinds all close', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 14; // white bishop

        board.board[3][3] = 12; // black rook
        board.board[2][2] = 12; // black rook
        board.board[5][5] = 12; // black rook
        board.board[6][6] = 12; // black rook
        board.board[3][5] = 12; // black rook
        board.board[2][6] = 12; // black rook
        board.board[5][3] = 12; // black rook
        board.board[6][2] = 12; // black rook

        let moves = getBishopMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(0);
    })
    test('edge case in corner', () => {
        let board = Board.createEmpty();

        board.board[0][0] = 14; // white bishop

        let moves = getBishopMoves(0, 0, 1, 2, board);
    
        expect(moves).toHaveLength(7);
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [1, 1], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [2, 2], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [3, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [4, 4], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [5, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [6, 6], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [0, 0], newPosition: [7, 7], capturedPeiceValue: -1});
    })
    test('rook surronded', () => {
        let board = Board.createEmpty();

        board.board[4][4] = 12; // white bishop

        board.board[5][3] = 12; // white rook
        board.board[3][5] = 12; // white rook
        board.board[6][6] = 12; // white rook
        board.board[2][2] = 22; // black rook

        let moves = getBishopMoves(4, 4, 1, 2, board);
    
        expect(moves).toHaveLength(3);
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [5, 5], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [3, 3], capturedPeiceValue: -1});
        expect(moves).toContainEqual({originalPosition: [4, 4], newPosition: [2, 2], capturedPeiceValue: 22});
    })
})
