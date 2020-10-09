<template>
  <div class="layout">
    <MainHeader />
    <nuxt />
    <ProjectNav
      :github-link="projects[currentIndex].github"
      :prev-link="projects[prevIndex].route"
      :next-link="projects[nextIndex].route"
    />
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from '~/components/navigation/MainHeader.vue';
import MainFooter from '~/components/navigation/MainFooter.vue';
import ProjectNav from '~/components/navigation/ProjectNav.vue';
import { PROJECT_DATA } from '~/lib/constants';

export default {
  components: { MainHeader, MainFooter, ProjectNav },
  computed: {
    projects() {
      return PROJECT_DATA.filter(p => !p.link.includes('http')).map(p => ({
        github: p.github,
        route: p.link,
      }));
    },
    currentIndex() {
      const route = this.$route.path;
      let index = 0;
      this.projects.forEach((project, i) => {
        if (route.includes(project.route)) index = i;
      });
      return index;
    },
    prevIndex() {
      let prev = this.currentIndex - 1;
      prev = prev < 0 ? this.projects.length - 1 : prev;
      return prev;
    },
    nextIndex() {
      let next = this.currentIndex + 1;
      next = next >= this.projects.length ? 0 : next;
      return next;
    },
  },
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
      {
        href: 'https://fonts.googleapis.com/css?family=Averia+Libre:700',
        rel: 'stylesheet',
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Permanent+Marker',
        rel: 'stylesheet',
      },
    ],
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
  padding: 60px 0 0;

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
