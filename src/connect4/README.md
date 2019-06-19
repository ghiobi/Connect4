# Connect4 Engine

A simple zero dependency dynamic connect 4 engine with parameters to adjust the size of the board and the number of tokens to connect.

## Usage

TypeScript

```js
import { Connect4, Player, Connect4GameStatus } from "connect4-engine";

const game = new Connect4([new Player("#000"), new Player("#FFF")]);

// Insert tokens in a column
game.insert(0); // Player 1 inserts in column 1.
game.insert(3); // Player 2 inserts in column 4.
game.insert(0); // Player 1 inserts in column 1.
...

// Print out board.
console.log(game.state.board);

// Get game status.
console.log(game.state.status === Connect4GameStatus.IN_PROGRESS);
```

## API

### Connect4

- constructor(players: Player[], width = 7, height = 6, connect = 4)

#### players

Type: Player[]

Two player objects. Length must be 2.

#### width - Optional - Default = 7

Type: number

Number of horizontal slots.

#### height - Optional - Default = 6

Type: number

Number of vertical slots.

#### connect - Optional - Default = 4

Type: number

Number of tokens to connect.

- insert(column): boolean

Returns true if insertion was successful.

#### column

Type: number

The column in which to insert the token in. 0 being the first column, or 1 to be the second, and so on.

- getColumnByIndex(index): column

Returns the column number.

#### index

Type: number

The index in the board array.

- state

Returns the state game object, Connect4State.

### Connect4State

A object representating the entire game state.

#### winner

Type: Player

The winner of the game, if there is no winner or the game is still in progress it would be null.

#### playing

Type: Player

The current player who is playing.

#### board

Type: Player[]

The board depicting the players on the board.

#### status

Type: Connect4GameStatus

A TypeScript enum representing the game status.

### Connect4GameStatus

Type: Enum

- HAS_WINNER - There is a winner.
- TIE - The game has ended with a tie.
- IN_PROGRESS - The game is in progress.

### Player

constructor(color: string)

#### color

Type: string

A string representing a hex color. e.g. `'#FFFFF'`
