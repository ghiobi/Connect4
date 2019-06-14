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

  constructor(private players: Player[]) {
    this.board = new Array<Player>(Connect4.WIDHT * Connect4.HEIGHT).fill(null);
    this.columns = new Array(Connect4.WIDHT).fill(0);
    this.playing = this.players[0];
    this.cache = this.state;
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
   * @param column The column in which to place a token. [0, CONNECT.WIDTH].
   * @returns boolean Returns true if the placement of the token is correct, false otherwise.
   */
  insert(column: number): boolean {
    if (this.state.status !== Connect4GameStatus.IN_PROGRESS) {
      return false;
    }

    // The column is already full.
    if (this.columns[column] > Connect4.HEIGHT - 1) {
      return false;
    }

    // Get the index by the column given.
    const index =
      (Connect4.HEIGHT - this.columns[column]) * Connect4.WIDHT -
      (Connect4.WIDHT - column);

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
        Connect4.HEIGHT,
        Connect4.WIDHT,
        (i, j) => i * Connect4.WIDHT + j
      ) ||
      // VERTICAL CHECK
      this.hasWinnerOnLinearSlots(
        Connect4.WIDHT,
        Connect4.HEIGHT,
        (i, j) => j * Connect4.WIDHT + i
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
          if (++count === Connect4.CONNECT) {
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
   * Returns true if a player has an equal amount of Connect4.CONNECT tokens connected.
   */
  private diagonalLeftDownCheck(): boolean {
    let v = 0;

    for (let i = 0; ; ) {
      let previous = null;
      let count = 0;
      for (let j = v; j < Connect4.HEIGHT; j++) {
        const position = i + Connect4.WIDHT * j + j - v;

        if (position > this.board.length) {
          break;
        }

        const current = this.board[position];

        if (current !== null && previous === current) {
          previous = current;
          if (++count === Connect4.CONNECT) {
            return true;
          }
        } else {
          previous = current;
          count = 1;
        }

        if (position % Connect4.WIDHT === 6) {
          break;
        }
      }

      if (i <= Connect4.WIDHT - Connect4.CONNECT && v === 0) {
        i++;
        if (i > Connect4.WIDHT - Connect4.CONNECT) {
          i = 0;
          v = 1;
        }
      } else if (i === 0 && v < Connect4.HEIGHT - Connect4.CONNECT) {
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
    for (let i = Connect4.CONNECT - 1; ; ) {
      let previous = null;
      let count = 0;
      for (let j = v; j < Connect4.HEIGHT; j++) {
        const position = i + Connect4.WIDHT * j - j + v;

        if (position > this.board.length) {
          break;
        }

        const current = this.board[position];

        if (current !== null && previous === current) {
          previous = current;
          if (++count === Connect4.CONNECT) {
            return true;
          }
        } else {
          previous = current;
          count = 1;
        }

        if (position % Connect4.WIDHT === 0) {
          break;
        }
      }

      if (i < Connect4.WIDHT - 1) {
        i++;
      } else if (
        i === Connect4.WIDHT - 1 &&
        v < Connect4.HEIGHT - Connect4.CONNECT
      ) {
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
    if (this.plays < Connect4.CONNECT * 2 - 1) {
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
