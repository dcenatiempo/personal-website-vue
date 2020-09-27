<template>
  <button
    class="hamburger"
    :class="localExpanded ? 'expanded' : ''"
    @click="toggleHamburger"
  >
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </button>
</template>

<script>
export default {
  data() {
    return {
      localExpanded: false,
    };
  },
  props: {
    /**
    The expanded state of the button
    */
    expanded: { type: Boolean, default: false },
  },
  watch: {
    expanded(val) {
      debugger;
      if (val !== this.localExpanded) this.localExpanded = val;
    },
  },
  created() {
    debugger;
    if (this.expanded !== this.localExpanded)
      this.localExpanded = this.expanded;
  },
  methods: {
    toggleHamburger() {
      debugger;
      this.localExpanded = !this.localExpanded;
      this.$emit('click', this.localExpanded);
    },
  },
};
</script>

<style lang="scss">
.hamburger {
  display: inline-block;
  cursor: pointer;

  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 5px;
    background-color: white;
    margin: 6px 0;
    transition: 0.4s;
    border-radius: 2px;
  }

  &.expanded {
    .bar1 {
      transform: rotate(-45deg) translate(-7.5px, 8px);
    }

    .bar2 {
      opacity: 0;
    }

    .bar3 {
      transform: rotate(45deg) translate(-7.5px, -8px);
    }
  }
}
</style>
