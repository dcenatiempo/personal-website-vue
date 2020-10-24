<template>
  <main class="dungeon-crawl">
    <DungeonCrawl />
  </main>
</template>

<script>
import DungeonCrawl from 'dungeon-crawl';
console.log(DungeonCrawl);
export default {
  components: { DungeonCrawl },
  data: () => ({}),
  computed: {},
  methods: {},
  destroyed() {
    // https://github.com/championswimmer/vuex-persist/issues/80
    this.$store.commit('clearUnregisteredModules');
  },
};
</script>

<style lang="scss">
.dungeon-crawl {
}
</style>
