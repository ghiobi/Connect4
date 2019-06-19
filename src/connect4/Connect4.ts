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
  static readonly CONNECT = 4;

  private board: Player[];
  private playing: Player;
  private plays: number = 0;
  private cache: Connect4State;
  private columns: number[];

  constructor(
    private players: Player[],
    private height = 6,
    private width = 7,
    private connect = 4
  ) {
    if (this.players.length !== 2) {
      throw new Error(
        `Connect4 - Constructor requires 2 players, got ${
          players.length
        } instead.`
      );
    }

    if (this.connect > this.height || this.connect > this.width) {
      throw new Error(
        `Connect4 - Constructor wrong width or height enterred. Please make it larger than the connect size.`
      );
    }

    this.board = new Array<Player>(this.width * this.height).fill(null);
    this.columns = new Array(this.width).fill(0);
    this.playing = this.players[0];
  }

  /**
   * Returns the column by the given index.
   *
   * @param index An number starting from [0, this.width - 1].
   */
  getColumnByIndex(index: number): number {
    const float = index / this.width;
    return Math.round((float - Math.floor(float)) * this.width);
  }

  /**
   * Places a token in a column.
   *
   * @param column The column in which to place a token. [0, CONNECT.WIDTH].
   * @returns boolean Returns true if the placement of the token is correct, false otherwise.
   */
  insert(column: number): boolean {
    if (this.state.status !== Connect4GameStatus.IN_PROGRESS) {
      return false;
    }

    // The column is already full.
    if (this.columns[column] > this.height - 1) {
      return false;
    }

    // Get the index by the column given.
    const index =
      (this.height - this.columns[column]) * this.width - (this.width - column);

    // Set the player on the board.
    this.board = [...this.board];
    this.board[index] = this.playing;

    // Update logistics.
    this.plays++;
    this.cache = null;
    this.playing = this.getNextPlayer();
    this.columns[column] = this.columns[column] + 1;

    return true;
  }

  /**
   * Returns a game state at any point in time.
   */
  get state(): Connect4State {
    if (!this.cache) {
      const status = this.status;

      this.cache = {
        winner:
          status === Connect4GameStatus.HAS_WINNER
            ? this.getNextPlayer()
            : null,
        playing: this.playing,
        board: [...this.board],
        status
      };
    }

    return this.cache;
  }

  /**
   * Gets the next player.
   *
   * @returns player A Player
   */
  private getNextPlayer(): Player {
    return this.players[0] === this.playing ? this.players[1] : this.players[0];
  }

  /**
   * Determines if there is a winner.
   *
   * @returns Returns true if there is, false otherwise.
   */
  private hasWinner(): boolean {
    // HORIZONTAL CHECK
    return (
      this.hasWinnerOnLinearSlots(
        this.height,
        this.width,
        (i, j) => i * this.width + j
      ) ||
      // VERTICAL CHECK
      this.hasWinnerOnLinearSlots(
        this.width,
        this.height,
        (i, j) => j * this.width + i
      ) ||
      // DOWN LEFT DIAGONAL CHECK
      this.diagonalLeftDownCheck() ||
      this.diagonalRightDownCheck()
    );
  }

  /**
   * Checks where there is a winner on the horizontal or vertical axis.
   *
   * @param OUTER The outer loop limit.
   * @param INNER The inner loop limit.
   * @param position Calculates the position based on the i and j indexes.
   */
  private hasWinnerOnLinearSlots(
    OUTER: number,
    INNER: number,
    position: (outer: number, inner: number) => number
  ): boolean {
    for (let i = 0; i < OUTER; i++) {
      let previous = null;
      let count = 0;
      for (let j = 0; j < INNER; j++) {
        const current = this.board[position(i, j)];
        if (current !== null && previous === current) {
          previous = current;
          if (++count === this.connect) {
            return true;
          }
        } else {
          previous = current;
          count = 1;
        }
      }
    }
    return false;
  }

  /**
   * Performs a left down diagonal check on the board.
   * Returns true if a player has an equal amount of this.connect tokens connected.
   */
  private diagonalLeftDownCheck(): boolean {
    let v = 0;

    for (let i = 0; ; ) {
      let previous = null;
      let count = 0;
      for (let j = v; j < this.height; j++) {
        const position = i + this.width * j + j - v;
        const current = this.board[position];

        if (current !== null && previous === current) {
          previous = current;
          if (++count === this.connect) {
            return true;
          }
        } else {
          previous = current;
          count = 1;
        }

        if (position % this.width === 6) {
          break;
        }
      }

      if (i <= this.width - this.connect && v === 0) {
        i++;
        if (i > this.width - this.connect) {
          i = 0;
          v = 1;
        }
      } else if (i === 0 && v < this.height - this.connect) {
        v++;
      } else {
        break;
      }
    }
    return false;
  }

  /**
   * Performs a righ down diagonal check on the board.
   */
  private diagonalRightDownCheck() {
    let v = 0;
    for (let i = this.connect - 1; ; ) {
      let previous = null;
      let count = 0;
      for (let j = v; j < this.height; j++) {
        const position = i + this.width * j - j + v;
        const current = this.board[position];

        if (current !== null && previous === current) {
          previous = current;
          if (++count === this.connect) {
            return true;
          }
        } else {
          previous = current;
          count = 1;
        }

        if (position % this.width === 0) {
          break;
        }
      }

      if (i < this.width - 1) {
        i++;
      } else if (i === this.width - 1 && v < this.height - this.connect) {
        v++;
      } else {
        break;
      }
    }
    return false;
  }

  /**
   * Returns the game status state.
   */
  private get status(): Connect4GameStatus {
    if (this.plays < this.connect * 2 - 1) {
      return Connect4GameStatus.IN_PROGRESS;
    }
    if (this.hasWinner()) {
      return Connect4GameStatus.HAS_WINNER;
    }
    if (this.plays === this.board.length) {
      return Connect4GameStatus.TIE;
    }
    return Connect4GameStatus.IN_PROGRESS;
  }
}
