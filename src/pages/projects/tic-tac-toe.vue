<template>
  <TicTacToe />
</template>

<script>
import TicTacToe from '~/components/projects/tic-tac-toe';
export default {
  layout: 'projects',
  head: {
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Permanent+Marker',
        rel: 'stylesheet',
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Averia+Libre:700',
        rel: 'stylesheet',
      },
    ],
  },
  components: { TicTacToe },
};
</script>
