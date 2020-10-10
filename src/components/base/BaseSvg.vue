<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="icon-container" :style="style" v-html="svg" />
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      default: 'question',
    },
    size: {
      type: Number,
      default: 16,
    },
    color: {
      type: String,
      default: null,
    },
  },
  computed: {
    svg() {
      return require(`!!html-loader!~/assets/svg/${this.name}.svg`);
    },
    style() {
      let style = `height: ${this.size}px; width: ${this.size}px;`;
      style += this.color ? `color: ${this.color};` : '';
      return style;
    },
  },
  mounted() {
    this.$el.firstChild.classList.add('svg-icon');
  },
};
</script>
<style lang="scss">
.icon-container {
  box-sizing: border-box;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  .svg-icon {
    fill: currentColor;
    height: 100%;
    width: 100%;
    color: inherit;

    * {
      color: inherit;
      fill: currentColor;
    }
  }
}
</style>
