import React from "react";
import styling from "../styling";

import {
  Connect4,
  Connect4State,
  Player,
  Connect4GameStatus
} from "../connect4";

export class Connect4Component extends React.Component {
  public props: { style: CSSProperties };
  public state: Connect4State;
  private game: Connect4;

  /**
   * When the component is created the oninit() method is created.
   */
  componentWillMount(): void {
    this.createGame();
  }

  /**
   * Creates a new game.
   */
  createGame(): void {
    this.game = new Connect4([new Player("#F46197"), new Player("#F7DD5B")]);
    this.setState(this.game.state);
  }

  /**
   * Called when a user clicks on a token.
   *
   * @param index The index in which the column was selected.
   */
  select(index): void {
    const column = this.game.getColumnByIndex(index);

    this.game.insert(column);
    this.setState(this.game.state);
  }

  is(state: Connect4GameStatus): boolean {
    return this.state.status === state;
  }

  render() {
    const boardStyle = {
      display: "flex",
      color: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "2rem"
    };
    const tokenStyle = {
      backgroundColor: this.is(Connect4GameStatus.IN_PROGRESS)
        ? this.state.playing.color
        : this.state.winner
        ? this.state.winner.color
        : "black",
      position: "absolute",
      margin: "auto"
    };
    return (
      <div style={this.props.style}>
        <div style={boardStyle}>
          <div style={{ flex: 1 }}>
            {this.is(Connect4GameStatus.IN_PROGRESS) && (
              <div style={{ textAlign: "right", marginRight: "50px" }}>
                IT'S
              </div>
            )}
          </div>
          <div className={styling.connect4Token} style={tokenStyle} />
          <div style={{ flex: "1" }}>
            <div style={{ marginLeft: "50px" }}>
              {this.is(Connect4GameStatus.IN_PROGRESS)
                ? "TURN."
                : this.state.winner
                ? "WON."
                : "TIED."}
            </div>
          </div>
        </div>
        <div className={styling.connect4}>
          <div className={styling.connect4Grid}>
            {this.state.board.map((player: Player, index: number) => {
              return (
                <div className={styling.connect4Slot} key={index}>
                  <div
                    style={{
                      backgroundColor: player ? player.color : "#FFFDF7"
                    }}
                    className={
                      styling.connect4SlotToken + " " + styling.connect4Token
                    }
                    onClick={() => !player && this.select(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className={styling.connect4Foot} style={{ left: 0 }} />
          <div className={styling.connect4Foot} style={{ right: 0 }} />
        </div>
        <button
          className={styling.connect4NewGameButton}
          style={{
            color: !this.is(Connect4GameStatus.IN_PROGRESS) ? "#FF" : ""
          }}
          onClick={this.createGame.bind(this)}
        >
          NEW GAME
        </button>
      </div>
    );
  }
}
