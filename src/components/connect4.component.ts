import m from "mithril";

import { Connect4 } from "../connect4/Connect4";
import { Player } from "../connect4/Player";

export class Connect4Component {
  private game: Connect4;

  oninit() {
    this.createGame();
  }

  createGame() {
    this.game = new Connect4([new Player("red"), new Player("blue")]);
  }

  view() {
    return m("div", "Connect4 game");
  }
}
