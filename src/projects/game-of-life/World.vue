<template>
  <canvas id="world" :height="rows * zoom" :width="cols * zoom" />
  <!-- <div v-for="(row, ri) in cells" :key="ri" class="row">
      <Cell
        v-for="(cell, ci) in row"
        :key="`${ri}-${ci}`"
        :alive="cell.alive"
        :count="cell.count"
        :zoom="zoom"
        @click="handleClick(ri, ci)"
      />
    </div> -->
</template>

<script>
const START_ANGLE = 0; // Starting point on circle
const END_ANGLE = 2 * Math.PI; // End point on circle

export default {
  props: {
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
  }),
  watch: {
    cells(cells) {
      this.drawWorld(cells);
    },
  },
  mounted() {
    let c = document.getElementById('world');
    this.canvas = c.getContext('2d');
  },
  methods: {
    handleClick(row, col) {
      //extract coordinates and send them as arguments to manualClick()
      this.$emit('manual-click', { row, col });
    },
    drawCell(ri, ci) {
      const cell = this.cells[ri][ci];
      const diameter = this.zoom;
      const radius = diameter / 2; // Arc radius
      const x = diameter * ci + radius; // x coordinate
      const y = diameter * (ri + 1); // y coordinate
      this.canvas.beginPath();
      this.canvas.arc(x, y, radius, START_ANGLE, END_ANGLE);
      this.canvas.fillStyle = this.getColor(cell);
      this.canvas.fill();
    },
    drawWorld(cells) {
      // draw background

      // draw each cell
      cells.forEach((row, ri) => {
        row.forEach((col, ci) => {
          this.drawCell(ri, ci);
        });
      });
    },
    getColor(cell) {
      if (cell.alive) return '#009973';
      if (cell.count < 200) return `rgb(255, ${255 - cell.count}, 0)`;
      else if (cell.count < 300) return `rgb(255, 55, ${-200 + cell.count})`;
      //	else if(count < 380)
      //		return "rgb("+(555-count)+", "+(55)			+", "+(count-200)	+")"
      //	else if(count < 480)
      //		return "rgb("+(175)		 +", "+(count-325)	+", "+(175)	+")"
      else return 'rgb(255, 55, 100)';
    },
  },
};
</script>

<style lang="scss">
@import './vars';
#world {
  display: flex;
  flex-flow: column nowrap;
  background: rgb(255, 255, 150);
  height: 100%;
  width: 100%;
}
</style>
