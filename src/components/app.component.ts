import m from "mithril";
import { Connect4Component } from "./connect4.component";

export class AppComponent {
  view() {
    return m(Connect4Component);
  }
}
