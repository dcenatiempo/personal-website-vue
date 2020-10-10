<template>
  <nav class="project-nav">
    <nuxt-link :to="prevLink" class="left-nav" title="previous project">
      &lt;prev project
    </nuxt-link>
    <a :href="githubLink" target="_blank" title="view code in GitHub">
      <BaseSvg class="github-logo" :size="50" name="github" />
    </a>
    <nuxt-link :to="nextLink" class="right-nav" title="next project">
      next project&gt;
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  props: {
    githubLink: { type: String, default: '#' },
    prevLink: { type: String, default: '#' },
    nextLink: { type: String, default: '#' },
  },
};
</script>

<style lang="scss" scoped>
.project-nav {
  pointer-events: none;
  position: fixed;
  bottom: 28px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.75),
    white
  );

  .left-nav {
    text-align: right;
  }

  a {
    pointer-events: all;
    display: block;
    font-family: 'Averia Libre';
    color: rgba(55, 55, 55, 0.8);
    text-decoration: none;
    font-size: 1.5em;
    text-shadow: 1px 1px 10px rgba(255, 255, 255, 0.968);
    margin: 30px 0 10px 0;
  }

  .github-logo {
    margin: 0 50px;
  }
  @media only screen and (max-width: 500px) {
    .github-logo {
      margin: 0 20px;
    }
  }
}
</style>
