<template>
  <div class="world">
    <div v-for="(row, ri) in cells" :key="ri" class="row">
      <Cell
        v-for="(cell, ci) in row"
        :key="`${ri}-${ci}`"
        :alive="cell.alive"
        :count="cell.count"
        :zoom="zoom"
        @click="handleClick(ri, ci)"
      />
    </div>
  </div>
</template>

<script>
import Cell from './Cell';

export default {
  components: { Cell },
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
  },
  methods: {
    handleClick(row, col) {
      //extract coordinates and send them as arguments to manualClick()
      this.$emit('manual-click', { row, col });
    },
  },
};
</script>

<style lang="scss">
@import './vars';
.world {
  display: flex;
  flex-flow: column nowrap;
  background: rgb(255, 255, 150);
  height: 100%;
  width: 100%;
}
</style>
