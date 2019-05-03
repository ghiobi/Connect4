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
    this.game = new Connect4([new Player("#F46197"), new Player("#F7DD5B")]);
  }

  /**
   * Returns the state of the game for rendering.
   */
  get state(): Connect4State {
    return this.game.state;
  }

  /**
   * Called when a user clicks on a token.
   *
   * @param index The index in which the column was selected.
   */
  select(index): void {
    const column = this.game.getColumnByIndex(index);

    this.game.insert(column);
    console.log("The selected column is -> ", column);
  }

  /**
   * TODO!
   * Renders the borad here.
   */
  view() {
    return m("div", [
      m("div", { class: styling.connect4 }, [
        m(
          "div",
          { class: styling.connect4Grid },
          this.state.board.map((player: Player, index: number) =>
            m(
              "div",
              {
                class: styling.connect4Slot
              },
              m("div", {
                class: styling.connect4SlotToken,
                onclick: () => !player && this.select(index),
                style: {
                  backgroundColor: player ? player.color : "#FFFDF7"
                }
              })
            )
          )
        ),
        m("div", {
          class: styling.connect4Foot,
          style: {
            left: 0
          }
        }),
        m("div", {
          class: styling.connect4Foot,
          style: {
            right: 0
          }
        })
      ]),
      m(
        "button",
        { class: styling.connect4NewGameButton, onclick: this.createGame },
        "NEW GAME"
      )
    ]);
  }
}
