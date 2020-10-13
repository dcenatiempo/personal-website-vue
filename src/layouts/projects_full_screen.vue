<template>
  <div class="layout" :class="{ full: hideNavigation }">
    <MainHeader :hide="hideNavigation" />
    <nuxt />
    <ProjectNav
      :hide="hideNavigation"
      :github-link="projects[currentIndex].github"
      :prev-link="projects[prevIndex].route"
      :next-link="projects[nextIndex].route"
    />
    <MainFooter :hide="hideNavigation" />
    <BaseButton
      class="toggle-nav"
      label="show nav"
      @click="$store.commit('toggleNavigation', false)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MainHeader from '~/components/navigation/MainHeader.vue';
import MainFooter from '~/components/navigation/MainFooter.vue';
import ProjectNav from '~/components/navigation/ProjectNav.vue';
import { PROJECT_DATA } from '~/lib/constants';

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default {
  components: { MainHeader, MainFooter, ProjectNav },
  data: () => ({
    mounted: true,
  }),
  computed: {
    ...mapGetters(['hideNavigation']),
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
  watch: {
    hideNavigation(hide) {
      const vm = this;
      if (hide) return;
      this.delayHideNav();
    },
  },
  mounted() {
    this.delayHideNav();
  },
  beforeDestroy() {
    this.mounted = false;
    this.$store.commit('toggleNavigation', false);
  },
  methods: {
    delayHideNav() {
      const vm = this;
      sleep(5000).then(() => {
        if (!vm.mounted) return;
        vm.$store.commit('toggleNavigation', true);
      });
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

<style lang="scss" scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  background-color: #e2d7d3;
  padding: 0;
  overflow: hidden;

  main {
    flex: 1;
    width: 100%;
    max-width: 1400px;
    background-color: white;
    padding: 0;
    margin-bottom: 0;
  }

  .toggle-nav {
    position: fixed;
    bottom: 60px;
    right: 10px;
    opacity: 0;
    pointer-events: none;
    transition: opacity ease 500ms;
  }

  footer {
    position: fixed;
    bottom: 0;
  }

  &.full {
    .toggle-nav {
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>
