<template>
  <div :class="`cell alive-${alive}`" :style="style" @click="$emit('click')" />
</template>

<script>
export default {
  props: {
    alive: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
    zoom: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    style() {
      return `background: ${this.getColor(this.count)}; height: ${
        this.zoom
      }px; width: ${this.zoom}px;`;
    },
  },
  methods: {
    getColor(count) {
      if (count < 200) return `rgb(255, ${255 - count}, 0)`;
      else if (count < 300) return `rgb(255, 55, ${-200 + count})`;
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

.cell {
  border-radius: 100%;
  background: gray;
  &.alive-true {
    background: $alive !important;
  }
  &.alive-false {
  }
}
</style>
