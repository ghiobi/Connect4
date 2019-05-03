import m from "mithril";
import styling from "../styling";

import { Connect4, Connect4State, Player } from "../connect4";

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

  move(index): void {}

  /**
   * TODO!
   * Renders the borad here.
   */
  view() {
    return m(
      "div",
      { class: styling.connect4 },
      this.state.board.map((player: Player) =>
        m("div", {
          class: styling.connect4Slot,
          style: {
            backgroundColor: player ? player.color : "white"
          }
        })
      )
    );
  }
}
