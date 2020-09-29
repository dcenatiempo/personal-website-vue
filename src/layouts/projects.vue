<template>
  <div class="layout">
    <MainHeader />
    <nuxt />
    <ProjectNav
      :thisLink="projects[currentIndex].link"
      :prevLink="projects[prevIndex].route"
      :nextLink="projects[nextIndex].route"
    />
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from '~/components/navigation/MainHeader.vue';
import MainFooter from '~/components/navigation/MainFooter.vue';
import ProjectNav from '~/components/navigation/ProjectNav.vue';

const projects = [
  {
    route: 'simon-game',
    link:
      'https://github.com/dcenatiempo/personal-website-vue/blob/master/src/pages/projects/simon-game.vue',
  },
];

export default {
  components: { MainHeader, MainFooter, ProjectNav },
  data() {
    return {
      projects: projects,
    };
  },
  computed: {
    currentIndex() {
      const index = 0;
      projects.forEach((project, i) => {
        if (this.$route.path.includes(project.name)) index = i;
      });
      return index;
    },
    prevIndex() {
      let prev = this.currentIndex - 1;
      prev = prev < 0 ? projects.length - 1 : prev;
      return prev;
    },
    nextIndex() {
      let next = this.currentIndex + 1;
      next = next >= projects.length ? 0 : next;
      return next;
    },
  },
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
  height: 100vh;

  main {
    flex: 1;
    width: 100%;
    max-width: 1400px;
    background-color: white;
    padding: 0 20px;
    margin-bottom: 0;
  }
}
</style>
