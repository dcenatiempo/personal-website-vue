<template>
  <main class="simon-game">
    <div class="screen">
      <div class="board">
        <div class="paddle-container">
          <div v-for="button in buttons" class="paddles" :key="button.key">
            <svg height="100%" width="100%" viewBox="0 0 230 230">
              <path
                @click="onClickPaddle(button)"
                :fill="button.on ? button.colorOn : button.colorOff"
                :d="button.path"
              />
            </svg>
          </div>
        </div>
        <div class="center-console">
          <div class="control-container">
            <div class="control-logo">simon</div>
            <div class="control-display">
              <div class="score">{{ score }}</div>
            </div>
            <div class="control-buttons">
              <div class="button-control">
                <button class="small-button" @click="initiateGame" />
                start
              </div>
              <div class="button-control">
                <button
                  class="small-button"
                  :class="strictMode ? 'pressed' : ''"
                  @click="toggleStrictMode"
                />
                strict
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const clicky =
  'http://res.cloudinary.com/dcenatiempo/video/upload/v1499727069/click_rnmyzb.wav';
const buzzer =
  'http://res.cloudinary.com/dcenatiempo/video/upload/v1499571473/buzzer_cogzhf.m4a';
const tones = {
  eLower:
    'http://res.cloudinary.com/dcenatiempo/video/upload/v1499548753/green_cl8zdp.m4a',
  a:
    'http://res.cloudinary.com/dcenatiempo/video/upload/v1499548753/red_d3r8or.m4a',
  cSharp:
    'http://res.cloudinary.com/dcenatiempo/video/upload/v1499548752/yellow_am0xi0.m4a',
  eUpper:
    'http://res.cloudinary.com/dcenatiempo/video/upload/v1499548752/blue_n6wtpd.m4a',
};
const paths = {
  upperLeft:
    'M 0 217 L 116 217 A 118 118, 0,0,1, 217 119.6 L 217 0 A 230 230, 0, 0, 0, 0 217',
  upperRight:
    'M 230 217 L 116 217 A 118 118, 0,0,0, 13 119.6 L 13 0 A 230 230, 0, 0, 1, 230 217',
  lowerLeft:
    'M 0 13 L 116 13 A 118 118, 0,0,0, 217 119.6 L 217 230 A 230 230, 0, 0, 1, 0 13',
  lowerRight:
    'M 13 230 L 13 119.6 A 118 118, 0,0,0, 116, 13 L 230 13 A 230 230, 0, 0, 1, 13 230',
};

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function getRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  layout: 'projects',
  head: {
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Alfa+Slab+One',
        rel: 'stylesheet',
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed',
        rel: 'stylesheet',
      },
    ],
  },
  data() {
    return {
      numCorrect: 0, // current number correct in round
      winScore: 20, // number of rounds to win
      isDeviceTurn: true, // disable player actions
      strictMode: false, // one wrong move, game over
      gameHasStarted: false,
      sequence: [], // sequence of colord paddle indexes
      buttons: [
        {
          idx: 0,
          key: '0-green-upper-left',
          sound: tones.eLower,
          colorOff: '#00b359',
          colorOn: '#99ffcc',
          path: paths.upperLeft,
          on: false,
        },
        {
          idx: 1,
          key: '1-red-upper-right',
          sound: tones.a,
          colorOff: '#cc3300',
          colorOn: '#ffc266',
          path: paths.upperRight,
          on: false,
        },
        {
          idx: 2,
          key: '2-yellow-lower-left',
          sound: tones.cSharp,
          colorOff: '#e6e600',
          colorOn: '#ffffb3',
          path: paths.lowerLeft,
          on: false,
        },
        {
          idx: 3,
          key: '3-blue-lower-right',
          sound: tones.eUpper,
          colorOff: '#1a75ff',
          colorOn: '#66ffff',
          path: paths.lowerRight,
          on: false,
        },
      ],
    };
  },
  computed: {
    score() {
      return this.sequence?.length || '-';
    },
    speed() {
      // speed increases as rounds progress
      const length = this.sequence.length;
      if (length <= 4) return 1;
      if (length <= 9) return 2;
      if (length <= 13) return 3;
    },
  },
  methods: {
    playSound(sound) {
      if (sound) {
        const audio = new Audio(sound);
        audio.play();
        return audio;
      }
    },
    win() {
      // when player wins, the paddles do a happy dance
      this.isDeviceTurn = true;
      this.gameHasStarted = false;
      const winning = setInterval(() => {
        this.buttons.forEach(button => (button.on = true));
        sleep(100).then(() => this.resetButtons());
      }, 200);

      sleep(4000).then(() => {
        this.resetButtons();
        clearInterval(winning);
      });
    },
    resetButtons() {
      this.buttons.forEach(button => {
        button.on = false;
      });
    },
    toggleStrictMode() {
      this.strictMode = !this.strictMode;
    },
    initiateGame() {
      this.resetButtons();
      this.gameHasStarted = true;
      this.isDeviceTurn = true;
      this.sequence = [];
      this.numCorrect = 0;
      this.doDeviceTurn();
    },
    onClickPaddle(button) {
      const vm = this;
      this.playSound(clicky);

      if (this.isDeviceTurn || !this.gameHasStarted) return;

      // if correct button pressed...
      if (button.idx === this.sequence[this.numCorrect]) {
        const audio = this.playSound(button.sound);
        button.on = true;
        vm.numCorrect += 1;
        sleep(600).then(() => {
          button.on = false;
        });

        // if player is not done with sequence for current round
        if (vm.numCorrect !== vm.sequence.length) return;

        // if player got entire sequence correct in current (but not last) round
        if (vm.numCorrect < vm.winScore) return vm.doDeviceTurn();

        // if player got last squence correct in last round
        return vm.win();
      }

      // else if wrong button pressed in strict mode...
      if (this.strictMode) {
        this.gameHasStarted = false;
        this.isDeviceTurn = true;
        button.on = true;
        let audio = this.playSound(buzzer);
        sleep(2500).then(() => {
          button.on = false;
          audio.pause();
        });
        return;
      }

      // else if wrong button pressed NOT in strict mode...
      this.numCorrect = 0;
      button.on = true;
      let audio = this.playSound(buzzer);
      sleep(1000)
        .then(() => {
          button.on = false;
          audio.pause();
          return sleep(800);
        })
        .then(() => {
          this.playSequence();
        });
    },
    doDeviceTurn() {
      this.sequence = [...this.sequence, getRand(0, 3)];
      this.numCorrect = 0;
      this.playSequence();
    },
    playSequence() {
      this.isDeviceTurn = true;
      let i = 0;
      const vm = this;
      return sleep(500).then(() => {
        return new Promise((resolve, reject) => {
          const loop = setInterval(() => {
            const button = vm.buttons[vm.sequence[i]];

            // turn light/sound on
            button.on = true;
            const audio = vm.playSound(button.sound);

            //turn light off, stop sound
            sleep(550 - vm.speed * 100).then(() => {
              audio.pause();
              button.on = false;
              i += 1;

              if (i === vm.sequence.length) {
                vm.isDeviceTurn = false;
                clearInterval(loop);
                resolve();
              }
            });
          }, 650 - vm.speed * 100);
        });
      });
    },
  },
};
</script>

<style lang="scss">
.simon-game {
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Roboto Condensed', sans-serif;
    color: #262626;
  }

  .screen {
    top: 47%;
    width: 80vmin;
    height: 80vmin;
    margin: 20px auto;
    margin-bottom: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;

    .board {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #262626;
      border-radius: 150%;
      margin: auto;
      padding: 4vmin;
      box-shadow: 1.2vmin 1.2vmin 5vmin gray;

      .center-console {
        position: absolute;
        left: 30.4%;
        top: 30.9%;
        border: none;
        border-radius: 100%;
        background-color: transparent;
        border-color: yellow;
        height: 40%;
        width: 40%;

        .control-container {
          height: 100%;
          width: 100%;
          background-color: #d1d1e0;
          border-radius: 100%;
          pointer-events: none;

          .control-logo {
            font-family: 'Alfa Slab One', cursive;
            height: 40%;
            width: 100%;
            text-align: center;
            font-size: 8vmin;
            padding: 10%;
          }

          .control-buttons,
          .control-display {
            height: 30%;
            width: 100%;
            display: flex;
            justify-content: center;

            .score {
              font-family: Courier, monospace;
              background-color: black;
              color: red;
              height: 70%;
              width: 27%;
              border-radius: 10%;
              font-size: 7vmin;
              line-height: 7vmin;
              text-align: center;
              padding: 0 1%;
              margin: auto;
              text-align: right;
            }

            .button-control {
              height: 100%;
              width: 30%;
              text-align: center;
              display: flex;
              flex-flow: column nowrap;
              justify-content: flex-start;
              font-size: 3.3vmin;

              .small-button {
                height: 30%;
                width: 30%;
                margin: 0 auto;
                border-radius: 100%;
                pointer-events: all;

                &.pressed,
                &:active {
                  background-color: orange;
                }
              }
            }
          }
        }
      }

      .paddle-container {
        border: none;
        border-color: yellow;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-content: space-between;

        .paddles {
          height: 50%;
          width: 50%;
          border: none;
          border-color: orange;
        }
      }
    }
  }
}
</style>
