<template>
  <main class="game-of-life">
    <Header :generations="generations" />
    <World
      :cells="cells"
      :speed="settings.speed"
      :zoom="settings.zoom"
      :power-on="on"
      @update-board="updateBoard"
      @manual-click="manualClick"
    />
    <Footer
      :on="on"
      :settings="settings"
      :viewport="viewport"
      @action="doAction"
      @change-setting="changeSetting"
    />
  </main>
</template>

<script>
import Header from './Header';
import World from './World';
import Footer from './Footer';
export default {
  components: {
    Header,
    World,
    Footer,
  },
  data: () => ({
    interval: null,
    viewport: { w: 0, h: 0 },
    on: false, // true/false
    cells: [], // array of arrays(rows) of objects(cells/cols) { alive: false, count: 0}
    generations: 0, // # of iterations - reset when board is randomized or cleared
    pop: 0,
    settings: {
      speed: 25, // 1-50
      zoom: 15,
      density: 3, // density of random fill 1-7
      rows: 40, // 20-80?
      cols: 60, // 30-120?
      autoFill: false,
    },
  }),
  computed: {},
  watch: {
    'viewport.w'() {
      this.resetGrid();
      if (this.settings.autoFill) this.changeFill();
      console.log('window size change!');
    },
    on() {
      if (this.on) {
        this.interval = setInterval(() => {
          this.updateBoard();
        }, 1000 / this.settings.speed);
      } else {
        clearInterval(this.interval);
      }
    },
    'settings.speed'() {
      if (!this.on) return;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.updateBoard();
      }, 1000 / this.settings.speed);
    },
  },
  mounted() {
    this.viewport = process.client ? this.$viewport : { w: 0, h: 0 };
    this.resetGrid();
    this.randomFill();
    this.$store.commit('toggleNavigation', true);
  },
  methods: {
    resetGrid() {
      let { h, w } = this.getGridSize(this.viewport, this.settings.zoom);
      this.settings.rows = h;
      this.settings.cols = w;
    },
    doAction(action) {
      if (action === 'clear') return this.clearWorld();
      if (action === 'randomize') return this.randomFill();
      if (action === 'toggleOn') return this.toggleOn();
    },
    changeSetting({ setting, value }) {
      // validate
      if (!Object.keys(this.settings).includes(setting)) return;

      // change setting
      this.settings[setting] = value;

      // maybe re-render world
      if (['autoFill', 'cols', 'rows', 'zoom'].includes(setting)) {
        this.changeFill();
      }
    },
    getGridSize(window, cellSize) {
      let headerH = 50; //header height in pixels
      let footerH = 50; //footer height in pixels
      let h;
      let w;
      let bigMax = 120;
      let smallMax = 80;
      h = Math.round((window.h - headerH - footerH - cellSize / 10) / cellSize);
      w = Math.round((window.w - cellSize / 5) / cellSize);
      if (h > w) {
        //portrait mode
        if (h > bigMax) h = bigMax;
        if (w > bigMax - h + smallMax) w = smallMax;
      } else if (h < w) {
        //landscape mode
        if (w > bigMax) w = bigMax;
        if (h > bigMax - w + smallMax) h = smallMax;
      }
      return {
        h: h,
        w: w,
      };
    },

    manualClick({ row, col }) {
      // let tempArray = this.cells.map(r => r.map(c => c));
      // tempArray[row][col].alive = !tempArray[row][col].alive;
      // this.cells = tempArray,
      this.cells[row][col].alive = !this.cells[row][col].alive;
    },
    updateBoard() {
      const vm = this;
      const height = this.cells.length - 1;
      const width = this.cells[0].length - 1;
      // count up all live neighbors
      // ri, rc parameters are coordinates of cell in question
      function countNeighbors(ri, ci) {
        let count = 0;

        for (let r = -1; r < 2; r++) {
          let tempR = r + ri;
          if (tempR === -1) tempR = height;
          else if (tempR > height) tempR = 0;
          for (let c = -1; c < 2; c++) {
            if (c != 0 || r != 0) {
              let tempC = c + ci;
              if (tempC === -1) tempC = width;
              else if (tempC > width) tempC = 0;

              count += +vm.cells[tempR][tempC].alive;
            }
          }
        }

        return count;
      }

      const tempCells = this.cells.map((row, ri) =>
        row.map((cell, ci) => {
          const numNeighbors = countNeighbors(ri, ci);
          let newCount = cell.count;
          let newAlive = cell.alive;
          if (cell.alive) {
            if (numNeighbors === 2 || numNeighbors === 3) {
              newCount += 1;
            } else {
              newAlive = false;
            }
          } else if (numNeighbors === 3) {
            newAlive = true;
            newCount = newCount >= 400 ? 400 : newCount + 1;
          } else {
            newAlive = false;
            newCount = newCount <= 0 ? 0 : newCount - 1;
          }
          return {
            alive: newAlive,
            count: newCount,
          };
        })
      );
      this.cells = tempCells;
      this.generations += 1;
    },
    createBlank() {
      let tempCells = [];

      for (let r = 0; r < this.settings.rows; r++) {
        tempCells.push([]);
        for (let c = 0; c < this.settings.cols; c++) {
          tempCells[r].push({ alive: false, count: 0 });
        }
      }
      return tempCells;
    },

    clearWorld() {
      this.cells = this.createBlank();
      this.generations = 0;
      this.on = false;
    },

    changeFill() {
      let tempCells = [];
      for (let r = 0; r < this.settings.rows; r++) {
        tempCells.push([]);
        for (let c = 0; c < this.settings.cols; c++) {
          // if prev cells exist, use those
          const newCell = this.cells?.[r]?.[c] || { alive: false, count: 0 };
          tempCells[r].push(newCell);
        }
      }
      this.cells = tempCells;
    },

    randomFill() {
      let tempCells = [];
      for (let r = 0; r < this.settings.rows; r++) {
        tempCells.push([]);
        for (let c = 0; c < this.settings.cols; c++) {
          // random value for 'alive' key
          const rand = Math.random();
          const dense = 1 - this.settings.density / 10;
          const newCell =
            rand > dense
              ? { alive: true, count: 0 }
              : { alive: false, count: 0 };
          tempCells[r].push(newCell);
        }
      }
      this.cells = tempCells;
      this.generations = 0;
    },

    toggleOn() {
      this.on = !this.on;
    },
  },
};
</script>

<style lang="scss">
@import './vars';
main.game-of-life {
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  padding: 0;

  * {
    box-sizing: border-box;
    font-family: Helvetica, sans-serif;
    color: $light-text;
    font-size: 14px;
    text-align: center;
  }

  .flex-row {
    display: flex;
    flex-flow: row wrap;
  }
  .flex-col {
    display: flex;
    flex-flow: column nowrap;
  }
  .row {
    display: flex;
    flex-flow: row nowrap;
  }
}
</style>
