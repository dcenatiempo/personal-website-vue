<template>
  <main class="tic-tac-toe">tic tac toe</main>
</template>

<script>
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function getRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  layout: 'projects',
  head: {
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Alfa+Slab+One',
        rel: 'stylesheet',
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed',
        rel: 'stylesheet',
      },
    ],
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
.tic-tac-toe {
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Roboto Condensed', sans-serif;
    color: #262626;
  }
}
</style>
