import jss from "jss";
import global from "jss-plugin-global";
import preset from "jss-preset-default";

jss.setup(preset());

const WIDTH = 500;

const style = {
  "@global": {
    body: {
      margin: 0,
      backgroundColor: "#eee"
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
    width: WIDTH
  },
  connect4Slot: {
    width: WIDTH / 7,
    height: WIDTH / 7,
    float: "left"
  }
};

// Compile styles, apply plugins.
const sheet = jss.createStyleSheet(style, [global]);

// Attach style
sheet.attach();
export default sheet.classes;
