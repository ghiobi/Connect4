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
  constructor(private players: Player[]) {}

  /**
   *
   * @param index Places a token on the board.
   * @returns boolean Returns true if the placement of the token is correct, else otherwise.
   */
  move(index): boolean {
    return false;
  }

  get state(): Connect4State {
    return {
      winner: null,
      playing: null,
      board: null,
      status: Connect4GameStatus.IN_PROGRESS
    };
  }
}
