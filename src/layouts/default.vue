<template>
  <div class="layout">
    <MainHeader />
    <nuxt />
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from '~/components/navigation/MainHeader.vue';
import MainFooter from '~/components/navigation/MainFooter.vue';

export default {
  components: { MainHeader, MainFooter },
};
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  background-color: #e2d7d3;

  main {
    width: 100%;
    max-width: 1400px;
    background-color: white;
    padding: 0 20px;
    margin-bottom: 0;
  }
}
</style>
