<template>
  <footer :class="{ hide: hideNavigation }">
    Designed &amp; Coded by Devin Cenatiempo 2017-{{ thisYear }}
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      thisYear: new Date().getFullYear(),
    };
  },
  computed: {
    ...mapGetters(['hideNavigation']),
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

  &.hide {
    display: none;
  }
}
</style>
