<template>
  <div class="world">
    <canvas
      id="canvas"
      :height="rows * zoom"
      :width="cols * zoom"
      @click="handleClick"
    />
  </div>
</template>

<script>
const START_ANGLE = 0; // Starting point on circle
const END_ANGLE = 2 * Math.PI; // End point on circle

const BACKGROUND_COLOR = 'rgb(255, 255, 150)';
const ALIVE_COLOR = '#009973';

export default {
  props: {
    manualClicks: {
      type: Number,
      default: 0,
    },
    generations: {
      type: Number,
      default: 0,
    },
    cells: {
      type: Array,
      default: () => [],
    },
    speed: {
      type: Number,
      required: true,
    },
    zoom: {
      type: Number,
      required: true,
    },
    powerOn: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      required: true,
    },
    cols: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    canvas: null,
    cxt: null,
    lastRenderedGeneration: null,
    lastZoom: null,
  }),
  watch: {
    powerOn(on) {
      if (!on) return;
      this.initiateAnimate();
    },
    cells() {
      if (this.powerOn) return;
      this.drawWorld(this.cells);
    },
    manualClicks() {
      this.drawWorld(this.cells);
    },
  },
  mounted() {
    // const vm = this;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    // vm.drawWorld(vm.cells);
  },
  methods: {
    step() {
      if (
        this.lastRenderedGeneration !== this.generations ||
        this.zoom !== this.lastZoom
      ) {
        this.lastRenderedGeneration = this.generations;
        this.lastZoom = this.zoom;
        this.drawWorld(this.cells);
      }

      if (this.powerOn) window.requestAnimationFrame(this.step);
    },
    initiateAnimate() {
      window.requestAnimationFrame(this.step);
    },
    handleClick(e) {
      const col = Math.floor(e.offsetX / this.zoom);
      const row = Math.floor(e.offsetY / this.zoom);

      //extract coordinates and send them as arguments to manualClick()
      this.$emit('manual-click', { row, col });
    },
    drawCell(ri, ci) {
      const cell = this.cells[ri][ci];
      const diameter = this.zoom;
      const radius = diameter / 2; // Arc radius
      const x = diameter * ci + radius; // x coordinate
      const y = diameter * (ri + 0.5); // y coordinate
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, START_ANGLE, END_ANGLE);
      this.ctx.fillStyle = this.getColor(cell);
      this.ctx.fill();
    },
    drawWorld(cells) {
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // draw background
      this.ctx.fillStyle = BACKGROUND_COLOR;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // draw each cell
      cells.forEach((row, ri) => {
        row.forEach((col, ci) => {
          this.drawCell(ri, ci);
        });
      });
    },
    getColor(cell) {
      if (cell.alive) return ALIVE_COLOR;
      if (cell.count < 200) return `rgb(255, ${255 - cell.count}, 0)`;
      else if (cell.count < 300) return `rgb(255, 55, ${-200 + cell.count})`;
      else return 'rgb(255, 55, 100)';
    },
  },
};
</script>

<style lang="scss">
@import './vars';
.world {
  flex: 1;
  background: rgb(255, 255, 150);
  width: 100%;
  overflow: scroll;
}
</style>
