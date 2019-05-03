import m from "mithril";
import { Connect4Component } from "./connect4.component";
import style from "../styling";

export class AppComponent {
  view() {
    return m(
      "div",
      { class: style.app },
      m("div", { class: style.game }, m(Connect4Component))
    );
  }
}
