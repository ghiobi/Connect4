# Connect4 Engine

A simple connect 4 engine with dynamic settings to adjust the size of the board, and the number of tokens to connect.

## Usage

```js
import { Connect4, Player } from "connect4-engine";

const game = new Connect4([new Player("#000"), new Player("#FFF")]);

// Insert tokens in a column
game.insert(0); // First player.
game.insert(3); // Second player.

// Get game state at any time.
console.log(game.state);
```

## API

### Connect4

- constructor(players: Player[], width = 7, height = 6, connect = 4)

#### players

Type: Player[]

Two player objects.

#### width - Optional - Default = 7

Type: number

Number of horizontal slots.

#### height - Optional - Default = 6

Type: number

Number of vertical slots.

#### connect - Optional - Default = 4

Type: number

Number of slots to connect.

- insert(column): boolean

Returns true if insertion was successful.

#### column

Type: number

The column in which to insert the token in. 0 being the first column, or 1 to be the second, and etc.

- getColumnByIndex(index): column

Returns the column number.

#### index

Type: number

The index in the board array.

- state

Returns the state game object, Connect4State.

### Connect4State

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
