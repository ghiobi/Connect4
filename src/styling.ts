import jss from "jss";
import global from "jss-plugin-global";
import preset from "jss-preset-default";
import { Connect4 } from "./connect4";

jss.setup(preset());

const CONNECT4WIDTH = 500;
const CONNECT4FOOTSIZE = 50;
const NUM_HORIZONTAL_TOKENS = 7;

const style = {
  "@global": {
    body: {
      margin: 0,
      backgroundColor: "#384D65",
      fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    },
    "*": {
      boxSizing: "border-box"
    }
  },
  app: {
    display: "flex",
    height: "100vh"
  },
  game: {
    margin: "auto"
  },
  connect4: {
    backgroundColor: "#00C6FF",
    padding: "1rem",
    borderTopRightRadius: "5%",
    borderTopLeftRadius: "5%",
    position: "relative"
  },
  connect4Grid: {
    width: CONNECT4WIDTH,
    overflow: "auto"
  },
  connect4Slot: {
    width: CONNECT4WIDTH / NUM_HORIZONTAL_TOKENS,
    height: CONNECT4WIDTH / NUM_HORIZONTAL_TOKENS,
    float: "left",
    position: "relative"
  },
  connect4Token: {
    borderRadius: "50%",
    width: (CONNECT4WIDTH / NUM_HORIZONTAL_TOKENS) * 0.9,
    height: (CONNECT4WIDTH / NUM_HORIZONTAL_TOKENS) * 0.9
  },
  connect4SlotToken: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: "auto"
  },
  connect4Foot: {
    height: CONNECT4FOOTSIZE,
    width: CONNECT4FOOTSIZE,
    position: "absolute",
    bottom: -(CONNECT4FOOTSIZE / 2),
    zIndex: -1,
    backgroundColor: "#00C6FF",
    borderRadius: "50%"
  },
  connect4NewGameButton: `
    margin: 0 auto;
    display: block;
    background-color: rgb(52, 70, 90);
    color: rgb(56, 77, 101);
    border: 0;
    margin-top: 1.5rem;
    font-size: 1.25rem;
    padding: .5rem;
    border-radius: 15px;
    `
};

// Compile styles, apply plugins.
const sheet = jss.createStyleSheet(style, [global]);

// Attach style
sheet.attach();
export default sheet.classes;
