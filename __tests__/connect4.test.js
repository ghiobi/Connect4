"use strict";
exports.__esModule = true;
var connect4_1 = require("../src/connect4");
describe("Connect 4 Engine", function() {
  var players = null;
  var connect4;
  beforeEach(function() {
    players = [new connect4_1.Player("#000"), new connect4_1.Player("#FFF")];
    connect4 = new connect4_1.Connect4(players);
  });
  it("should initialze the board with the correct parameters", function() {
    var state = connect4.state;
    expect(state.board.length).toEqual(42);
    expect(state.status).toEqual(connect4_1.Connect4GameStatus.IN_PROGRESS);
    expect(state.playing).toBe(players[0]);
  });
  it("should initialze the board with the custom parameters", function() {
    connect4 = new connect4_1.Connect4(players, 6, 6, 4);
    var state = connect4.state;
    expect(connect4.connect).toBe(4);
    expect(state.board.length).toBe(36);
    expect(state.status).toEqual(connect4_1.Connect4GameStatus.IN_PROGRESS);
    expect(state.playing).toBe(players[0]);
  });
  it("should insert the first player token in the first column, the second on top and so on", function() {
    connect4.insert(0);
    expect(connect4.state.board[35]).toBe(players[0]);
    connect4.insert(0);
    expect(connect4.state.board[28]).toBe(players[1]);
    connect4.insert(1);
    expect(connect4.state.board[36]).toBe(players[0]);
  });
  it("should return the correct column by index", function() {
    var column = connect4.getColumnByIndex(41);
    expect(column).toBe(6);
  });
  it("should expect a no winning when there are not four tokens connected", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            p[0], p[0], p[0], null, p[0], p[0], p[0],
            p[0], p[0], p[0], null, null, p[0], null,
            p[0], null, null, null, null, null, p[0],
            null, null, null, p[0], null, null, null,
            p[0], null, p[0], null, p[0], p[0], p[0],
            null, p[0], p[0], p[0], null, p[0], null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.IN_PROGRESS
    );
  });
  it("should expect a winning when there are four tokens connected horizontally", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            p[0], p[0], p[0], p[0], null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are four tokens connected horizontally", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, p[0], p[0], p[0], p[0], null, null,
            null, null, null, null, null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are four tokens connected horizontally", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            null, null, null, null, null, null, null,
            null, null, null, p[0], p[0], p[0], p[0],
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are four tokens connected down left", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, p[0], null, null, null, null,
            null, p[0], null, null, null, null, null,
            p[0], null, null, null, null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are four tokens connected down left", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, p[0],
            null, null, null, null, null, p[0], null,
            null, null, null, null, p[0], null, null,
            null, null, null, p[0], null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are four tokens connected down right", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            p[0], null, null, null, null, null, null,
            null, p[0], null, null, null, null, null,
            null, null, p[0], null, null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are four tokens connected down right", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            null, null, null, null, null, null, null,
            p[0], null, null, null, null, null, null,
            null, p[0], null, null, null, null, null,
            null, null, p[0], null, null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, null, null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are four tokens connected down right", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            null, null, null, p[0], null, null, null,
            null, null, null, null, p[0], null, null,
            null, null, null, null, null, p[0], null,
            null, null, null, null, null, null, p[0],
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are four tokens connected vertically", function() {
    var p = players;
    connect4.plays = 8;
    // prettier-ignore
    connect4.board = [
            null, null, null, p[0], null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are five tokens connected vertically", function() {
    var p = players;
    connect4.connect = 5;
    connect4.plays = 10;
    // prettier-ignore
    connect4.board = [
            null, null, null, p[0], null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, null, null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect a winning when there are five tokens connected down right", function() {
    var p = players;
    connect4.connect = 5;
    connect4.plays = 10;
    // prettier-ignore
    connect4.board = [
            null, null, p[0], null, null, null, null,
            null, null, null, p[0], null, null, null,
            null, null, null, null, p[0], null, null,
            null, null, null, null, null, p[0], null,
            null, null, null, null, null, null, p[0],
            null, null, null, null, null, null, null
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
  });
  it("should expect an in progress when there are no five tokens connected in any fashion", function() {
    var p = players;
    connect4.connect = 5;
    connect4.plays = 10;
    // prettier-ignore
    connect4.board = [
            null, null, null, p[0], null, null, null,
            null, p[0], p[0], p[0], p[0], null, null,
            null, null, p[0], p[0], p[0], p[0], null,
            null, p[0], p[0], null, null, p[0], p[0],
            p[0], null, p[0], null, null, null, p[0],
            null, null, null, p[0], p[0], p[0], p[0]
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.IN_PROGRESS
    );
  });
  it("should expect a winning when there are five tokens connected", function() {
    var p = players;
    connect4.connect = 5;
    connect4.plays = 10;
    // prettier-ignore
    connect4.board = [
            null, null, null, p[0], null, null, null,
            null, p[0], p[0], p[0], p[0], null, null,
            null, null, p[0], p[0], p[0], p[0], null,
            null, p[0], p[0], null, null, p[0], p[0],
            p[0], p[0], p[0], null, null, null, p[0],
            p[0], null, null, p[0], p[0], p[0], p[0]
        ];
    expect(connect4.state.status).toBe(
      connect4_1.Connect4GameStatus.HAS_WINNER
    );
    expect(connect4.insert(0)).toBeFalsy();
  });
  it("should expect a tie", function() {
    connect4.plays = 42;
    expect(connect4.state.status).toBe(connect4_1.Connect4GameStatus.TIE);
  });
  it("should expect column insertion to be full", function() {
    expect(connect4.insert(0)).toBeTruthy();
    expect(connect4.insert(0)).toBeTruthy();
    expect(connect4.insert(0)).toBeTruthy();
    expect(connect4.insert(0)).toBeTruthy();
    expect(connect4.insert(0)).toBeTruthy();
    expect(connect4.insert(0)).toBeTruthy();
    expect(connect4.insert(0)).toBeFalsy();
  });
});
