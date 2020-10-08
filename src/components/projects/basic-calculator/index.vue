<template>
  <main>
    <div class="basic-calculator">
      <section class="calc-logo">dC Instruments</section>
      <section class="screen-container">
        <div class="l-scrn">{{ lScreenDisplay }}</div>
        <div class="r-scrn">{{ rScreenDisplay }}</div>
      </section>
      <section class="button-container">
        <div class="left-btn-area">
          <button class="lbtn" @click="onPressSign">+/-</button>
          <button class="lbtn" @click="percent">%</button>
          <button class="lbtn memory" @click="clearEntry">CE</button>
          <button class="lbtn memory" @click="memRecall">MRC</button>
          <button class="lbtn memory" @click="memClear">M-</button>
          <button class="lbtn memory" @click="memSet">M+</button>
          <button class="lbtn num-btn" @click="numberPress(7)">7</button>
          <button class="lbtn num-btn" @click="numberPress(8)">8</button>
          <button class="lbtn num-btn" @click="numberPress(9)">9</button>
          <button class="lbtn num-btn" @click="numberPress(4)">4</button>
          <button class="lbtn num-btn" @click="numberPress(5)">5</button>
          <button class="lbtn num-btn" @click="numberPress(6)">6</button>
          <button class="lbtn num-btn" @click="numberPress(1)">1</button>
          <button class="lbtn num-btn" @click="numberPress(2)">2</button>
          <button class="lbtn num-btn" @click="numberPress(3)">3</button>
          <button class="lbtn num-btn" @click="numberPress(0)">0</button>
          <button class="lbtn num-btn" @click="decimalMode = true">.</button>
          <button class="lbtn equal" @click="equalPress">=</button>
        </div>
        <div class="right-btn-area">
          <button class="rbtn memory" @click="reset">RESET</button>
          <button class="rbtn" @click="operatorPress(divide)">/</button>
          <button class="rbtn" @click="operatorPress(multiply)">x</button>
          <button class="rbtn" @click="operatorPress(subtract)">-</button>
          <button class="rbtn plus" @click="operatorPress(add)">+</button>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
const SCREEN_SIZE_LIMIT = 12;
export default {
  props: {},
  data() {
    return {
      termL: 0,
      termR: 0,
      operator: this.add,
      defaultTermR: 0,
      defaultOperator: this.add,
      memory: null,
      typingNum: false, // true if last entry was 0-9 "." "+/-"
      decimalMode: false, // true if "." is pressed, false if typingNum == false
      rightDisplay: false, // true if +-*/ pressed, false if "=" pressed
    };
  },
  computed: {
    lScreenDisplay() {
      return this.memory ? 'M' : '';
    },
    rScreenDisplay() {
      let tempTerm;
      let scrDisplay;
      if (this.rightDisplay) tempTerm = this.termR;
      else tempTerm = this.termL;
      ////////////////////////////////////////////////////////////////////////////////
      scrDisplay = tempTerm.toString().split('');
      // check to see if number is 'Infinity'

      if (scrDisplay.findIndex(x => x === 'y') >= 0)
        scrDisplay = scrDisplay.join('');
      // check if number in scientific notation
      else if (scrDisplay.findIndex(x => x === 'e') >= 0)
        scrDisplay = tempTerm.toExponential(6);
      // check if number is decimal
      else if (scrDisplay.findIndex(x => x === '.') >= 0) {
        // split number into two parts: iteger and decimal
        scrDisplay = tempTerm.toString().split('.');
        let integer = scrDisplay[0].split('');
        let decimal = scrDisplay[1].split('');

        // remove sign if there is one
        let sign;
        if (integer[0] === '-') sign = integer.shift();

        // if integer portion is too big for screen, use scientific notation
        if (integer.length > SCREEN_SIZE_LIMIT)
          scrDisplay = tempTerm.toExponential(6);
        else {
          // if number is too big for screen, truncate decimal portion
          if (integer.length + decimal.length > SCREEN_SIZE_LIMIT) {
            let limit = SCREEN_SIZE_LIMIT - integer.length;
            decimal = decimal.slice(0, limit < 0 ? 0 : limit);
          }

          // if integer portion is 1,000+ add commas
          if (integer.length > 3) {
            let loop = Math.floor(integer.length / 3.1);
            for (let i = 0; i < loop; i++)
              integer.splice(integer.length - (3 + 3 * i + i), 0, ',');
          }

          // add sign back in if there is one
          if (sign) integer.unshift(sign);

          // put it all together again for display
          integer = integer.join('');
          decimal = decimal.join('');
          scrDisplay = integer + '.' + decimal;
        }
      }

      // number must be regular integer
      else {
        // remove sign if there is one
        let sign;
        if (scrDisplay[0] === '-') sign = scrDisplay.shift();

        // if number too big for screen convert to scientific notation
        if (scrDisplay.length > SCREEN_SIZE_LIMIT)
          scrDisplay = tempTerm.toExponential(6);
        // if bigger than 1,000 add commas
        else {
          let loop = Math.floor(scrDisplay.length / 3.1);
          for (let i = 0; i < loop; i++)
            scrDisplay.splice(scrDisplay.length - (3 + 3 * i + i), 0, ',');

          // add sign back in if there is one
          if (sign) scrDisplay.unshift(sign);

          // put it all together again for display
          scrDisplay.push('.');
          scrDisplay = scrDisplay.join('');
        }
      }
      return scrDisplay;
    },
  },
  created() {
    window.addEventListener('keypress', this.onKeyPress);
  },
  destroyed() {
    window.removeEventListener('keypress', this.onKeyPress);
  },
  methods: {
    add(a, b) {
      return a + b;
    },
    subtract(a, b) {
      return a - b;
    },
    multiply(a, b) {
      return a * b;
    },
    divide(a, b) {
      return a / b;
    },
    changeSign(a) {
      return a * -1;
    },
    reset() {
      this.termL = 0;
      this.termR = 0;
      this.operator = this.add;
      this.defaultTermR = 0;
      this.defaultOperator = this.add;
      this.typingNum = false;
      this.decimalMode = false;
      this.rightDisplay = false;
    },
    numberPress(num) {
      if (this.rightDisplay === false) {
        this.termL = this.writeNumber(num, this.termL);
      } else {
        this.termR = this.writeNumber(num, this.termR);
      }
    },
    writeNumber(x, term) {
      // todo: fix weird rounding errors 63.178
      if (this.typingNum === false) {
        this.typingNum = true;
        if (this.decimalMode === false) return x;
        else return x / 10;
      } else {
        if (this.decimalMode === false) return term * 10 + x;
        else {
          let place = 1;
          while ((term * Math.pow(10, place - 1)) % 1 > 0) place++;
          return term + x / Math.pow(10, place);
        }
      }
    },
    equalPress() {
      // reset decimalMode and rightDisplay
      this.decimalMode = false;
      this.rightDisplay = false;
      this.typingNum = false;

      // set defaults in case "CE" is pressed is.defaultOperator = this.operator; is.defaultTermR = this.termR;

      // do calculation and display to screen
      this.termL = this.operator(this.termL, this.termR);
    },
    operatorPress(oper) {
      // when stringing together operators
      if (this.rightDisplay) this.equalPress();

      this.decimalMode = false;
      this.rightDisplay = true;
      this.operator = oper;
      this.typingNum = false;
      this.termR = this.termL;
    },
    percent() {
      if (!this.rightDisplay) {
        this.termL = this.termL / 100;
      } else {
        this.termR = this.termR / 100;
        this.equalPress();
      }
    },
    clearEntry() {
      this.termR = this.defaultTermR;
      this.operator = this.defaultOperator;
      this.typingNum = false;
      this.decimalMode = false;
      this.rightDisplay = false;
    },
    memClear() {
      this.memory = null;
    },
    memSet() {
      this.memory = null;
      if (this.rightDisplay) this.memory = this.termR;
      else this.memory = this.termL;
    },
    memRecall() {
      if (this.memory !== null) {
        if (this.rightDisplay) this.termR = this.memory;
        else this.termL = this.memory;
      }
    },
    onPressSign() {
      if (this.rightDisplay) this.termR = this.changeSign(this.termR);
      else this.termL = this.changeSign(this.termL);
    },
    onKeyPress(key) {
      switch (key.keyCode) {
        case 49:
          this.numberPress(1);
          break;
        case 50:
          this.numberPress(2);
          break;
        case 51:
          this.numberPress(3);
          break;
        case 52:
          this.numberPress(4);
          break;
        case 53:
          this.numberPress(5);
          break;
        case 54:
          this.numberPress(6);
          break;
        case 55:
          this.numberPress(7);
          break;
        case 56:
          this.numberPress(8);
          break;
        case 57:
          this.numberPress(9);
          break;
        case 48:
          this.numberPress(0);
          break;
        case 46:
          this.decimalMode = true;
          break;
        case 61:
          this.equalPress();
          break;
        case 43:
          this.operatorPress(this.add);
          break;
        case 45:
          this.operatorPress(this.subtract);
          break;
        case 47:
          this.operatorPress(this.divide);
          break;
        case 13:
          this.equalPress();
          break;
        case 37:
          this.percent();
          break;
        case 42:
          this.operatorPress(this.multiply);
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.basic-calculator {
  display: flex;
  flex-flow: column nowrap;
  width: 350px;
  margin: 20px auto;
  padding: 15px;
  background-color: #eee;
  border-radius: 12px;
  box-shadow: 5px 5px 20px -5px grey, 7px 7px 8px 0px #ffffff inset,
    -5px -5px 7px -2px #8c8c8c inset;

  * {
    box-sizing: border-box;
    // font-family: Arial, Helvetica, sans-serif;
    font-family: 'Averia Libre', sans-serif;
  }

  .calc-logo {
    font-family: 'Averia Libre', sans-serif;
    text-align: right;
    margin: 5px;
  }

  .screen-container {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    text-align: right;
    padding: 1px;
    margin-bottom: 10px;
    background-color: #c7ccc9;
    color: #3f3f3f;
    border: 4px solid rgb(161, 161, 161);
    border-bottom-color: rgb(244, 244, 244);
    border-right-color: rgb(244, 244, 244);
    border-radius: 4px;

    .l-scrn {
      position: relative;
      font-size: 24px;
      top: 2px;
    }
    .r-scrn {
      flex: 1;
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 40px;
      padding-right: 5px;
    }
  }

  /* button area */
  .button-container {
    width: 100%;
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-flow: row nowrap;

    button {
      margin: 0 2px 5px 2px;
      padding: 0;
      overflow: hidden;
      box-shadow: -3px -3px 3px 0px rgba(0, 0, 0, 0.5) inset,
        3px 3px 3px 0px rgba(255, 255, 255, 0.5) inset;
      border: 3px solid rgb(155, 155, 155);

      &:active {
        box-shadow: -2px -2px 2px 0px rgba(0, 0, 0, 0.2) inset,
          3px 3px 3px 0px rgba(255, 255, 255, 0.2) inset;
        padding: 2px 0 0 2px;
      }
    }

    .left-btn-area {
      width: 75%;
      display: flex;
      flex-flow: row wrap;
    }
    .right-btn-area {
      width: 25%;
      display: flex;
      flex-flow: row wrap;
    }
    .lbtn,
    .rbtn {
      font-size: 17px;
      border-radius: 5px;
      background-color: rgb(199, 200, 201);

      &.memory {
        color: red;
      }
      &.equal {
        background-color: orange;
      }
    }
    .lbtn {
      flex: 1;
      flex-basis: 30%;
      height: 50px;
    }
    .rbtn {
      flex-shrink: 0;
      flex-basis: 95%;
      height: 55px;
    }
    .plus {
      height: 85px;
    }
    .num-btn {
      background-color: rgb(51, 51, 51);
      color: white;
      font-size: 20px;

      &:active {
        // box-shadow: -3px -3px 3px 0px #cccccc inset;
      }
    }
  }
}
/* on small screen, remove calculator "body", place buttons directly on background */
@media only screen and (max-width: 380px) {
  .layout main {
    padding: 0;
    background-color: #eee;
  }

  .basic-calculator {
    width: 100%;
    margin: 0;
    padding: 15px 5px;
    background-color: #eee;
    border-radius: 0px;
    box-shadow: none;

    .calc-logo {
      display: none;
    }

    .button-container {
      padding: 0px;
    }

    .screen-container {
      .l-scrn {
        font-size: 6vw;
      }
      .r-scrn {
        font-size: 12vw;
      }
    }
  }
}
</style>
