<template>
  <div class="segmented-control">
    <button
      v-for="(segment, i) in segments"
      :key="segment"
      class="segment"
      :class="{ selected: selected === i }"
      @click="onClick(i)"
    >
      {{ segment }}
    </button>
  </div>
</template>

<script>
// https://developer.apple.com/design/human-interface-guidelines/ios/controls/segmented-controls/
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    segments: { type: Array, default: () => ['Yes', 'No'] },
    selectedIndex: { type: Number, default: 0 },
  },
  data() {
    return {
      localSelectedIndex: 0,
    };
  },
  watch: {
    selectedIndex(selectedIndex) {
      if (selectedIndex === this.localSelectedIndex) return;
      this.localSelectedIndex = selectedIndex;
    },
  },
  methods: {
    onClick(i) {
      if (i === this.localSelectedIndex) return;
      this.localSelectedIndex = i;
      this.$emit('change', i);
    },
  },
};
</script>

<style lang="scss">
.segmented-control {
  background-color: #1a8cff;
  border-radius: 7px;
  border: 1px solid #1a8cff;
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;

  .segment {
    border: none;
    border-right: 1px solid #1a8cff;
    background-color: white;
    color: #1a8cff;
    text-align: center;

    &:last-child {
      border-right: none;
    }

    &.selected {
      background-color: #1a8cff;
      color: white;
    }

    &:hover {
      background-color: #1a8cff;
      color: white;
    }
  }
}
</style>
