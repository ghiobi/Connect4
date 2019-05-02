import m from "mithril";

import { Connect4, Connect4State } from "../connect4";
import { Player } from "../connect4";

export class Connect4Component {
  private game: Connect4;

  /**
   * When the component is created the oninit() method is created.
   */
  oninit(): void {
    this.createGame();
  }

  /**
   * Creates a new game.
   */
  createGame(): void {
    this.game = new Connect4([new Player("red"), new Player("blue")]);
  }

  /**
   * Returns the state of the game for rendering.
   */
  get state(): Connect4State {
    return this.game.state;
  }

  /**
   * TODO!
   * Renders the borad here.
   */
  view() {
    return m("div", "Connect4 game");
  }
}
