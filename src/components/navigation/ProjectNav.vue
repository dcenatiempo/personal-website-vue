<template>
  <nav class="project-nav">
    <nuxt-link :to="prevLink" class="left-nav" title="previous project">
      &lt;prev project
    </nuxt-link>
    <a :href="githubLink" target="_blank" title="view code in GitHub">
      <img
        src="~/assets/images/github.svg"
        class="github-logo"
        alt="view code in GitHub"
      />
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
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.75),
    white
  );
  width: 100%;
  .left-nav {
    text-align: right;
  }
  .github-logo {
    box-sizing: content-box;
    height: 48px;
    min-width: 50px;
    margin: 0 50px;
  }
  @media only screen and (max-width: 500px) {
    .github-logo {
      margin: 0 20px;
    }
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
}
</style>
