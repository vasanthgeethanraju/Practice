// Design a Chess Game – Define classes for a two-player chess game (Board, Spot, Piece hierarchy for King/Queen/Rook/etc., Move, Player, Game). 
// This classic question has been asked in interviews at Adobe, Amazon, Microsoft, etc.geeksforgeeks.org to assess object-oriented modeling.
// Candidates need to handle piece movements and game rules with proper class design (often using inheritance for pieces and possibly patterns like Factory for move generation).
// Im looking for a basic simple interview based solution for 1st round similar to how you gave for flight airline booking system

// WE WILL COME BACK TO THIS LATER ( DONT WORRY ABOUT IT NOW)
// Enums
const Color = { WHITE: "WHITE", BLACK: "BLACK" };
const GameStatus = { ACTIVE: "ACTIVE", CHECKMATE: "CHECKMATE", STALEMATE: "STALEMATE" };

// Spot - represents a cell on the board
class Spot {
  constructor(x, y, piece = null) {
    this.x = x;
    this.y = y;
    this.piece = piece;
  }
}

// Base Piece class
class Piece {
  constructor(color, type) {
    this.color = color;
    this.type = type; // "KING", "QUEEN", "ROOK", "BISHOP", "KNIGHT", "PAWN"
  }

  canMove(board, start, end) {
    // Basic validation - same color piece at destination
    if (end.piece && end.piece.color === this.color) return false;

    const xDiff = Math.abs(start.x - end.x);
    const yDiff = Math.abs(start.y - end.y);

    switch(this.type) {
      case "KING": return xDiff <= 1 && yDiff <= 1;
      case "QUEEN": return (xDiff === 0 || yDiff === 0 || xDiff === yDiff);
      case "ROOK": return (start.x === end.x || start.y === end.y);
      case "BISHOP": return xDiff === yDiff;
      case "KNIGHT": return (xDiff === 2 && yDiff === 1) || (xDiff === 1 && yDiff === 2);
      case "PAWN": 
        const dir = this.color === Color.WHITE ? -1 : 1;
        return start.y === end.y && end.x === start.x + dir && !end.piece;
      default: return false;
    }
  }
}

// Board - 8x8 grid
class Board {
  constructor() {
    this.spots = [];
    for (let i = 0; i < 8; i++) {
      this.spots[i] = [];
      for (let j = 0; j < 8; j++) {
        this.spots[i][j] = new Spot(i, j);
      }
    }
    this.initializeBoard();
  }

  getSpot(x, y) {
    return (x >= 0 && x < 8 && y >= 0 && y < 8) ? this.spots[x][y] : null;
  }

  initializeBoard() {
    // Pawns
    for (let i = 0; i < 8; i++) {
      this.spots[1][i].piece = new Piece(Color.BLACK, 'PAWN');
      this.spots[6][i].piece = new Piece(Color.WHITE, 'PAWN');
    }
    // Rooks
    this.spots[0][0].piece = new Piece(Color.BLACK, 'ROOK');
    this.spots[0][7].piece = new Piece(Color.BLACK, 'ROOK');
    this.spots[7][0].piece = new Piece(Color.WHITE, 'ROOK');
    this.spots[7][7].piece = new Piece(Color.WHITE, 'ROOK');
    // Kings
    this.spots[0][4].piece = new Piece(Color.BLACK, 'KING');
    this.spots[7][4].piece = new Piece(Color.WHITE, 'KING');
  }
}

// Move - records a move
class Move {
  constructor(start, end, piece) {
    this.start = start;
    this.end = end;
    this.piece = piece;
  }
}

// Player
class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

// Game - main controller
class Game {
  constructor(player1, player2) {
    this.board = new Board();
    this.players = [player1, player2];
    this.currentTurn = Color.WHITE;
    this.status = GameStatus.ACTIVE;
    this.moves = [];
  }

  makeMove(startX, startY, endX, endY) {
    const start = this.board.getSpot(startX, startY);
    const end = this.board.getSpot(endX, endY);

    if (!start?.piece) return false;
    if (start.piece.color !== this.currentTurn) return false;
    if (!start.piece.canMove(this.board, start, end)) return false;

    // Execute move
    this.moves.push(new Move(start, end, start.piece));
    end.piece = start.piece;
    start.piece = null;

    // Switch turn
    this.currentTurn = this.currentTurn === Color.WHITE ? Color.BLACK : Color.WHITE;
    return true;
  }
}

// Example
const p1 = new Player("Alice", Color.WHITE);
const p2 = new Player("Bob", Color.BLACK);
const game = new Game(p1, p2);

console.log(game.makeMove(6, 4, 4, 4)); // true - white pawn move
console.log(game.makeMove(1, 4, 3, 4)); // true - black pawn move