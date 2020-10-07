<template>
  <main class="tic-tac-toe">
    <div class="container">
      <h1>Tic-Tac-Toe</h1>
      <BaseSegmentedControl
        id="intel"
        v-model="intel"
        class="intel"
        :options="[
          { label: 'easy', value: -1 },
          { label: 'normal', value: 0 },
          { label: 'hard', value: 1 },
        ]"
        label-extractor="label"
        key-extractor="value"
        return-type="key"
        required
      />
      <div id="screen" class="container">
        <div v-if="gameStarted" class="board">
          <!-- player[whosTurn(board)] -->
          <button class="cell" @click="onPickSquare(0)">
            {{ board[0] }}
          </button>
          <button class="cell" @click="onPickSquare(1)">
            {{ board[1] }}
          </button>
          <button class="cell" @click="onPickSquare(2)">
            {{ board[2] }}
          </button>
          <button class="cell" @click="onPickSquare(3)">
            {{ board[3] }}
          </button>
          <button class="cell" @click="onPickSquare(4)">
            {{ board[4] }}
          </button>
          <button class="cell" @click="onPickSquare(5)">
            {{ board[5] }}
          </button>
          <button class="cell" @click="onPickSquare(6)">
            {{ board[6] }}
          </button>
          <button class="cell" @click="onPickSquare(7)">
            {{ board[7] }}
          </button>
          <button class="cell" @click="onPickSquare(8)">
            {{ board[8] }}
          </button>
        </div>

        <template v-else>
          <h2>Choose your mark:</h2>
          <BaseSegmentedControl
            id="xo"
            class="xo"
            :options="['x', 'o']"
            :label-extractor="item => item.toUpperCase()"
            @change="onChooseMark"
          />
        </template>
      </div>

      <div v-if="gameOver" class="game-over" :class="gameOverResult">
        <div id="message">{{ gameOverMessage }}</div>
      </div>
    </div>
  </main>
</template>

<script>
/*********************************************************************************
 * PURE FUNCTIONS
 * all functions outside of export are pure functions with no side effects
 *********************************************************************************/

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// random number generator, inclusive
function getRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// given board, returns who's turn it currently is: 0 or 1
function whosTurn(board) {
  const count = board.filter(space => space !== null).length;
  // if even # of empty spaces, it is O's turn
  if (count % 2 === 0) return 'x';
  // if odd # of empty spaces, it is X's turn - X always goes first
  else return 'o';
}

// given board, returns an array of empty spaces on board
function actions(board) {
  return board.reduce((array, space, i) => {
    if (space === null) return [...array, i];
    return array;
  }, []);
}

// given board and action index (i), returns new game board state after action is taken
function results(board, i) {
  var newBoard = [...board];
  newBoard.splice(i, 1, whosTurn(board));
  return newBoard;
}

// picks random empty cell
function randCell(board) {
  return actions(board)[getRand(0, actions(board).length - 1)];
}

// returns space of next move for AI
function nextAiMove({ board = FRESH_BOARD, intel = -1, human = 'x' }) {
  // if intel is -1, pick random cell
  if (intel === -1) return randCell(board);
  // determines round#
  let rnd = 0;
  for (let x = 0; x < board.length; x++) {
    if (board[x] !== null) rnd++;
  }
  // first round of Level 0 AI
  if (intel === 0) {
    if (rnd === 0 || rnd === 1) return randCell(board);
  }
  // first round of Level 1+ AI
  if (intel > 0) {
    if (rnd === 0) {
      //choose one of corners or middle randomly
      const r = getRand(0, 4);
      return r * 2;
    }
  }

  //subsequent rounds of Level 0+ AI
  let moves = actions(board);
  let move;
  let aNew;
  let aMin = 1000;
  for (let i = 0; i < moves.length; i++) {
    aNew = minimax({
      board: results(board, moves[i]),
      depth: undefined,
      human,
      intel,
    });
    //console.log(moves[i]+" "+aNew)
    if (aNew < aMin) {
      aMin = aNew;
      move = moves[i];
    }
  }
  return move;
}

// determins winnder from board state
function isWinner(board) {
  var playa = whosTurn(board) === 'x' ? 'o' : 'x';
  var util = utility(board, playa);
  if (util === 100) return playa;
  if (util === 0) return 'draw';
  return null;
}

/*********************************************************************************
 * algorithm behind AI https://en.wikipedia.org/wiki/Minimax
 * minimax()
 * utility()
 * terminal()
 *********************************************************************************/

/*************************************************************
 * minimax()
 * AI algorithm for two player zero sum games comprised of
 * decision rules for minimizing the possible loss for a
 * worst case (maximum loss) scenario.
 *************************************************************/
function minimax({ board = FRESH_BOARD, depth = 0, human = 'x', intel = -1 }) {
  if (depth >= intel) {
    // only go as deep as inteligence
    return utility(board, human);
  }
  if (terminal(board, human)) return utility(board, human);
  else if (whosTurn(board) == human) {
    var aArray = actions(board);
    var aNew;
    var aMax = -1000;
    for (var i = 0; i < aArray.length; i++) {
      aNew = minimax({
        board: results(board, aArray[i]),
        depth: depth + 1,
        human,
        intel,
      });
      if (aNew > aMax) aMax = aNew;
    }
    return aMax;
  } else if (whosTurn(board) != human) {
    var bArray = actions(board);
    var bNew;
    var bMin = 1000;
    for (let i = 0; i < bArray.length; i++) {
      bNew = minimax({
        board: results(board, bArray[i]),
        depth: depth + 1,
        human,
        intel,
      });
      if (bNew < bMin) bMin = bNew;
    }
    return bMin;
  }
}

/*************************************************************
 * utility()
 * returns utility of board for player p
 *************************************************************/
function utility(board, human = 'x') {
  var tCount = 0; // total number of occupied squares
  var pCount = 0; // counter for player p squares
  var nCount = 0; // counter for empty/null squares
  var utility = 0; // score this funciton returns

  // count total occupied squares
  for (var x = 0; x < board.length; x++) {
    if (board[x] !== null) tCount++;
  }
  if (tCount == 0) return 0.001;

  for (var i = 0; i < win.length; i++) {
    // loop through each win condition
    for (var j = 0; j < win[i].length; j++) {
      if (board[win[i][j]] === human) pCount++;
      else if (board[win[i][j]] == null) nCount++;
    }
    if (pCount + nCount == 3) {
      // row/col/diag is not occupied by opponent
      switch (pCount) {
        case 1: // player has 1 in a row
          utility += 1;
          break;
        case 2: // player has 2 in a row
          utility += 10;
          break;
        case 3: // player has won
          utility = 100;
          return utility;
      }
    }
    if (pCount === 0) {
      // row/col/diag is not occupied by player
      switch (nCount) {
        case 2: // opponent has 1 in a row
          utility -= 1.01;
          break;
        case 1: // opponent has 2 in a row
          utility -= 10.1;
          break;
        case 0: // opponent has won
          utility = -100;
          return utility;
      }
    }
    if (tCount < 9) utility += tCount / 100; // prevents false draw
    pCount = 0;
    nCount = 0;
  }
  return utility;
}

/*************************************************************
 * terminal()
 * determines if the game is in a terminal state
 *************************************************************/
function terminal(board, human) {
  var u = utility(board, human);
  if (u === 0) return true;
  if (Math.abs(u) == 100) return true;
  else return false;
}
/*********************************************************************************
 * end minimax algorithm
 *********************************************************************************/

// winning conditions
const win = [
  // horizontal win
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // verticle win
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal win
  [0, 4, 8],
  [2, 4, 6],
];

const FRESH_BOARD = [
  null,
  null,
  null, // 0, 1, 2
  null,
  null,
  null, // 3, 4, 5
  null,
  null,
  null,
]; // 6, 7, 8

export default {
  layout: 'projects',
  data() {
    return {
      isPlayerTurn: false,
      gameOver: false,
      gameStarted: false,
      gameOverResult: 'draw', // draw, win, loss
      color: '#1a8cff',
      // 2 players 0='X' 1='O'
      player: ['X', 'O'],
      // is human 'X' or 'O'?
      human: 'x',
      // how smart is AI - depth to search
      intel: 0,
      // playing board
      board: FRESH_BOARD,
    };
  },
  computed: {
    gameOverMessage() {
      if (this.gameOverResult === 'draw') return 'Draw';
      if (this.gameOverResult === 'win') return 'You Win!';
      if (this.gameOverResult === 'loss') return 'You Lose!';
      return '';
    },
  },
  methods: {
    setDifficultyLevel(level) {
      this.intel = level;
    },
    // initialize game
    reset() {
      this.gameOver = false;
      this.gameStarted = false;
      this.board = FRESH_BOARD;
    },
    onPickSquare(picked) {
      if (!this.isPlayerTurn) return;
      const vm = this;

      // check to see if cell picked already
      if (this.board[picked] !== null) return;

      this.assignCell(picked);
      this.isPlayerTurn = false;

      sleep(500).then(() => {
        // Do we have a winner?
        let winner = isWinner(vm.board);

        // Nope, let the AI take a turn
        if (winner === null) {
          vm.assignCell(
            nextAiMove({
              board: vm.board,
              intel: vm.intel,
              human: vm.human,
            })
          );

          // Do we have a winner now?
          winner = isWinner(vm.board);

          // Nope, let the human take a turn
          if (winner === null) {
            vm.isPlayerTurn = true;
            return;
          }
        }

        // Yes, lets end the game!
        sleep(500).then(() => vm.endGame(winner));
      });
    },
    onChooseMark(mark) {
      this.human = mark;

      this.gameStarted = true;
      this.isPlayerTurn = mark === 'x';

      if (this.isPlayerTurn) return;

      const vm = this;
      sleep(500).then(() => {
        vm.assignCell(
          nextAiMove({
            board: vm.board,
            intel: vm.intel,
            human: vm.human,
          })
        );
        vm.isPlayerTurn = true;
      });
    },
    assignCell(cell) {
      this.board = results(this.board, cell);
    },
    endGame(result) {
      const vm = this;
      this.gameOver = true;

      if (result === 'draw') {
        this.gameOverResult = 'draw';
      } else if (result == this.human) {
        this.gameOverResult = 'win';
      } else {
        this.gameOverResult = 'loss';
      }
      sleep(2000).then(() => vm.reset());
    },
  },
  head: {
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Permanent+Marker',
        rel: 'stylesheet',
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Averia+Libre:700',
        rel: 'stylesheet',
      },
    ],
  },
};
</script>

<style lang="scss">
.tic-tac-toe {
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333333;
  }
  body {
    padding-bottom: 90px; /* make room for project navigation*/
  }
  button {
    padding: 0;

    &:focus {
      outline: none;
    }
    &:focus-within::after {
      content: unset;
    }
  }

  .container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .intel .base-segment {
    height: 40px;
    width: 100px;
    font-size: 1.3em;
  }

  .xo .base-segment {
    height: 80px;
    width: 80px;

    label {
      font-family: 'Permanent Marker', cursive;
      font-size: 55px;
      line-height: 0;
    }
  }

  h1 {
    font-size: 36px;
  }
  h2 {
    font-size: 30px;
  }

  .board {
    font-size: 1vmin;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 2em;
    justify-items: stretch;
    align-items: stretch;
    width: 75em;
    height: 75em;
    margin: auto;
    margin-top: 5vh;
    text-align: center;
    background: #333333;
    box-shadow: inset 0 0 0 2px white;

    .cell {
      padding-top: 0.2em;
      font-size: 14em;
      font-family: 'Permanent Marker', cursive;
      background-color: white;
      color: #333333;
      border: none;
    }
  }

  .game-over {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: gray;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.draw {
      background-color: rgba(140, 140, 140, 0.5);
    }
    &.win {
      background-color: rgba(71, 209, 71, 0.5);
    }
    &.loss {
      background-color: rgba(255, 71, 26, 0.5);
    }
  }

  #message {
    font-size: 14vmin;
    color: white;
    font-weight: bold;
  }

  @media screen and (min-aspect-ratio: 7/10) {
    .board {
      font-size: 0.7vh;
    }
  }
}
</style>
