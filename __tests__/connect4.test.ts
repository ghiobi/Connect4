import { Player, Connect4, Connect4GameStatus } from "../src/connect4";

describe("Connect 4 Engine", () => {
  let players: Player[] = null;
  let connect4: Connect4;

  beforeEach(() => {
    players = [new Player("#000"), new Player("#FFF")];
  });

  describe("with a 7 width by 6 height board.", () => {
    beforeEach(() => {
      connect4 = new Connect4(players);
    });

    it("should initialze the board with the correct parameters", () => {
      const state = connect4.state;

      expect(state.board.length).toEqual(42);
      expect(state.status).toEqual(Connect4GameStatus.IN_PROGRESS);
      expect(state.playing).toBe(players[0]);
    });

    it("should initialze the board with the custom parameters", () => {
      connect4 = new Connect4(players, 6, 6, 4);
      const state = connect4.state;

      expect((connect4 as any).connect).toBe(4);
      expect(state.board.length).toBe(36);
      expect(state.status).toEqual(Connect4GameStatus.IN_PROGRESS);
      expect(state.playing).toBe(players[0]);
    });

    it("should insert the first player token in the first column, the second on top and so on", () => {
      connect4.insert(0);
      expect(connect4.state.board[35]).toBe(players[0]);

      connect4.insert(0);
      expect(connect4.state.board[28]).toBe(players[1]);

      connect4.insert(1);
      expect(connect4.state.board[36]).toBe(players[0]);
    });

    it("should return the correct column by index", () => {
      const column = connect4.getColumnByIndex(41);

      expect(column).toBe(6);
    });

    it("should expect a no winning when there are not four tokens connected", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              p[0], p[0], p[0], null, p[0], p[0], p[0],
              p[0], p[0], p[0], null, null, p[0], null,
              p[0], null, null, null, null, null, p[0],
              null, null, null, p[0], null, null, null,
              p[0], null, p[0], null, p[0], p[0], p[0],
              null, p[0], p[0], p[0], null, p[0], null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.IN_PROGRESS);
    });

    it("should expect a winning when there are four tokens connected horizontally", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              p[0], p[0], p[0], p[0], null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are four tokens connected horizontally", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, p[0], p[0], p[0], p[0], null, null, 
              null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are four tokens connected horizontally", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, null, null, null, null,
              null, null, null, p[0], p[0], p[0], p[0],
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are four tokens connected down left", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, p[0], null, null, null,
              null, null, p[0], null, null, null, null,
              null, p[0], null, null, null, null, null,
              p[0], null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are four tokens connected down left", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null,
              null, null, null,null, null, null, p[0], 
              null, null, null, null, null, p[0], null, 
              null, null, null,null, p[0], null, null, 
              null, null, null, p[0], null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are four tokens connected down right", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              p[0], null, null, null, null, null, null,
              null, p[0], null, null, null, null, null,
              null, null, p[0], null, null, null, null, 
              null, null, null, p[0], null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are four tokens connected down right", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, null, null, null, null,
              p[0], null, null, null, null, null, null,
              null, p[0], null, null, null, null, null, 
              null, null, p[0], null, null, null, null,
              null, null, null, p[0], null, null, null,
              null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are four tokens connected down right", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, p[0], null, null, null,
              null, null, null, null, p[0], null, null,
              null, null, null, null, null, p[0], null, 
              null, null, null, null, null, null, p[0],
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are four tokens connected vertically", () => {
      const p = players;

      (connect4 as any).plays = 8;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, p[0], null, null, null,
              null, null, null, p[0], null, null, null,
              null, null, null, p[0], null, null, null, 
              null, null, null, p[0], null, null, null,
              null, null, null, null, null, null, null,
              null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are five tokens connected vertically", () => {
      const p = players;

      (connect4 as any).connect = 5;
      (connect4 as any).plays = 10;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, p[0], null, null, null,
              null, null, null, p[0], null, null, null,
              null, null, null, p[0], null, null, null, 
              null, null, null, p[0], null, null, null,
              null, null, null, p[0], null, null, null,
              null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are five tokens connected down right", () => {
      const p = players;

      (connect4 as any).connect = 5;
      (connect4 as any).plays = 10;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, p[0], null, null, null, null,
              null, null, null, p[0], null, null, null,
              null, null, null, null, p[0], null, null, 
              null, null, null, null, null, p[0], null,
              null, null, null, null, null, null, p[0],
              null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect an in progress when there are no five tokens connected in any fashion", () => {
      const p = players;

      (connect4 as any).connect = 5;
      (connect4 as any).plays = 10;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, p[0], null, null, null,
              null, p[0], p[0], p[0], p[0], null, null,
              null, null, p[0], p[0], p[0], p[0], null, 
              null, p[0], p[0], null, null, p[0], p[0],
              p[0], null, p[0], null, null, null, p[0],
              null, null, null, p[0], p[0], p[0], p[0]
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.IN_PROGRESS);
    });

    it("should expect a winning when there are five tokens connected", () => {
      const p = players;

      (connect4 as any).connect = 5;
      (connect4 as any).plays = 10;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, p[0], null, null, null,
              null, p[0], p[0], p[0], p[0], null, null,
              null, null, p[0], p[0], p[0], p[0], null, 
              null, p[0], p[0], null, null, p[0], p[0],
              p[0], p[0], p[0], null, null, null, p[0],
              p[0], null, null, p[0], p[0], p[0], p[0]
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
      expect(connect4.insert(0)).toBeFalsy();
    });

    it("should expect a tie", () => {
      (connect4 as any).plays = 42;

      expect(connect4.state.status).toBe(Connect4GameStatus.TIE);
    });

    it("should expect column insertion to be full", () => {
      expect(connect4.insert(0)).toBeTruthy();
      expect(connect4.insert(0)).toBeTruthy();
      expect(connect4.insert(0)).toBeTruthy();
      expect(connect4.insert(0)).toBeTruthy();
      expect(connect4.insert(0)).toBeTruthy();
      expect(connect4.insert(0)).toBeTruthy();
      expect(connect4.insert(0)).toBeFalsy();
    });
  });

  describe("with 4 width by 4 height custom board", () => {
    beforeEach(() => {
      connect4 = new Connect4(players, 4, 8, 2);
    });

    it("should expect a winning when there are two tokens diagonally", () => {
      const p = players;

      (connect4 as any).plays = 4;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, null, null, null, null, null,
              null, null, null, null, null, null, null, p[0],
              null, null, null, null, null, null, p[0], null,
              null, null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are two tokens connected horizontally", () => {
      const p = players;

      (connect4 as any).plays = 4;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, null, null, null, null, null,
              null, null, null, null, null, null, p[0], p[0],
              null, null, null, null, null, null, null, null,
              null, null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a winning when there are two tokens connected diagonally", () => {
      const p = players;

      (connect4 as any).plays = 4;
      // prettier-ignore
      (connect4 as any).board = [
              null, null, null, null, null, null, null, null,
              null, null, null, null, null, null, p[0], null,
              null, null, null, null, null, null, null, p[0],
              null, null, null, null, null, null, null, null
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.HAS_WINNER);
    });

    it("should expect a no winning", () => {
      const p = players;

      (connect4 as any).connect = 3;
      (connect4 as any).plays = 6;
      // prettier-ignore
      (connect4 as any).board = [
              null, p[0], null, p[0], null, p[0], p[0], null,
              p[0], null, p[0], null, p[0], null, null, p[0],
              p[0], null, p[0], null, null, p[0], p[0], null,
              null, p[0], null, p[0], p[0], null, null, p[0]
          ];

      expect(connect4.state.status).toBe(Connect4GameStatus.IN_PROGRESS);
    });
  });
});
