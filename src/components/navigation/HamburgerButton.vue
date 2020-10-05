<template>
  <BaseButton
    class="hamburger-button"
    :class="localExpanded ? 'expanded' : ''"
    @click="toggleHamburger"
  >
    <div class="bar1" />
    <div class="bar2" />
    <div class="bar3" />
  </BaseButton>
</template>

<script>
export default {
  props: {
    expanded: { type: Boolean, default: false },
  },
  data() {
    return {
      localExpanded: false,
    };
  },
  watch: {
    expanded(val) {
      if (val !== this.localExpanded) this.localExpanded = val;
    },
  },
  created() {
    if (this.expanded !== this.localExpanded)
      this.localExpanded = this.expanded;
  },
  methods: {
    toggleHamburger() {
      this.localExpanded = !this.localExpanded;
      this.$emit('click', this.localExpanded);
    },
  },
};
</script>

<style lang="scss">
.base-button.hamburger-button {
  background: transparent;

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
