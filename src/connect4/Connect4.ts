import { Player } from "./Player";

export enum Connect4GameStatus {
  // There is a winner.
  HAS_WINNER,
  // The game has ended with a tie.
  TIE,
  // The game is in progress.
  IN_PROGRESS
}

export interface Connect4State {
  // The winner of the game, if there is no winner or the game is still in progress it would be null.
  winner: Player;
  // The current player who is playing.
  playing: Player;
  // The board depicting the players on the board.
  board: Player[];
  // The game status.
  status: Connect4GameStatus;
}

export class Connect4 {
  static readonly HEIGHT = 6;
  static readonly WIDHT = 7;

  private board: Player[];
  private playing: Player;

  constructor(private players: Player[]) {
    this.board = new Array<Player>(Connect4.WIDHT * Connect4.HEIGHT).fill(null);
    this.playing = this.players[0];
  }

  /**
   * Returns the column by the given index.
   *
   * @param index An number starting from [0, Connect4.WIDHT - 1].
   */
  getColumnByIndex(index: number): number {
    const float = index / Connect4.WIDHT;
    return Math.round((float - Math.floor(float)) * Connect4.WIDHT);
  }

  /**
   * Places a token in a column.
   *
   * @param column The column in which to place a token.
   * @returns boolean Returns true if the placement of the token is correct, false otherwise.
   */
  insert(column: number): boolean {
    let successful = false;

    for (let i = 0; i < Connect4.HEIGHT; i++) {
      const current = i * Connect4.WIDHT + column;
      const ahead = (i + 1) * Connect4.WIDHT + column;

      // The column is already full.
      if (this.board[current] !== null) {
        break;
      }

      // Search for the available slot.
      if (
        this.board[current] === null &&
        (this.board[ahead] !== null || this.board[ahead] === undefined)
      ) {
        this.board = [...this.board];
        this.board[current] = this.playing;

        successful = true;
        break;
      }
    }

    if (successful) {
      this.playing = this.getNextPlayer();
    }

    return successful;
  }

  /**
   * Gets the next player.
   *
   * @returns player A Player
   */
  getNextPlayer(): Player {
    return this.players[0] === this.playing ? this.players[1] : this.players[0];
  }

  /**
   * TODO!
   * Returns a game state at any point in time.
   */
  get state(): Connect4State {
    return {
      winner: null,
      playing: this.players[0],
      board: this.board,
      status: Connect4GameStatus.IN_PROGRESS
    };
  }
}
