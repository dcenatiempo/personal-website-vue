<template>
  <SimonGame />
</template>

<script>
import SimonGame from '~/components/projects/simon-game';
export default {
  layout: 'projects',
  components: { SimonGame },
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
};
</script>
