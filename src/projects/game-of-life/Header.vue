<template>
  <header class="header">
    <p>Game of Life</p>
    <div class="inspired">
      inspired by
      <a
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
      >
        John Conway
      </a>
    </div>
    <div>
      Gen:
      <span class="generations">{{ generations }}</span>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    generations: { type: Number, default: 0 },
  },
};
</script>

<style lang="scss">
@import './vars';

.game-of-life {
  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 50px;
    background: $header;
    margin: 0 auto;

    > p {
      font-size: 1.8em;
    }
  }
  .inspired {
  }
  .generations {
    padding: 10px;
    border: none;
    background: none;
  }
  @media only screen and (max-width: 800px) {
    header {
      width: 100%;
    }
  }
  @media only screen and (max-width: 550px) {
    .header {
      .inspired {
        display: none;
      }
    }
  }
}
</style>
