<template>
  <footer :class="{ hide }">
    Designed &amp; Coded by Devin Cenatiempo 2017-{{ thisYear }}
  </footer>
</template>

<script>
export default {
  props: {
    hide: { type: Boolean, default: false },
  },
  data() {
    return {
      thisYear: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  background-color: gray;
  text-align: center;
  color: white;
  padding: 5px 0;
  font-family: 'Averia Libre';
  transition: transform ease 500ms;

  &.hide {
    transform: translateY(150px);
  }
}
</style>
