<template>
  <header class="main-header">
    <div class="inner-header">
      <img
        src="~/assets/images/dcenatiempo-logo.svg"
        alt="dcenatiempo.com logo"
        class="logo"
      />
      <nav class="header-nav">
        <HamburgerButton
          v-if="viewport.w <= breakpoint"
          :expanded="expanded"
          @click="val => (expanded = val)"
          style="z-index: 10"
        />
        <ul
          class="nav-links"
          :class="{
            expanded: expanded,
            'small-screen': viewport.w <= breakpoint,
          }"
        >
          <li>
            <a href="/#about" @click="expanded = false">about</a>
          </li>
          <li>
            <a href="/#portfolio" @click="expanded = false">portfolio</a>
          </li>
          <li>
            <a href="/#contact" @click="expanded = false">contact</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import HamburgerButton from '~/components/navigation/HamburgerButton.vue';

export default {
  components: { HamburgerButton },
  data() {
    return {
      expanded: false,
      viewport: { h: 0, w: 0 },
      breakpoint: 700,
    };
  },
  watch: {
    'viewport.w'(w) {
      if (!this.expanded) return;
      if (w <= this.breakpoint) return;
      this.expanded = false;
    },
  },
  created() {
    if (process.client) {
      this.viewport = this.$viewport;
    }
  },
  methods: {},
};
</script>

<style lang="scss">
.main-header {
  width: 100%;
  background-color: #3cc26d;
  background: linear-gradient(to left, #4fdf82, #3cc26d, #2fb05c);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: fixed;
  top: 0; /* required as well. */
  height: 60px;
  z-index: 10;

  .inner-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1400px;
    align-items: center;

    .logo {
      margin: 10px;
      height: 40px;
      width: 250px;
      z-index: 10;
    }

    .header-nav {
      color: white;
      font-family: 'Averia Libre';
      z-index: 0;

      .nav-links {
        z-index: 0;
        display: flex;
        margin: 0;
        padding: 0;

        &.small-screen {
          position: fixed;
          flex-flow: column nowrap;
          top: -100vh;
          left: 0;
          right: 0;
          background-color: #3cc26d;
          background: linear-gradient(to left, #4fdf82, #3cc26d, #2fb05c);
          align-items: center;
          transform: translateY(0);
          transition: 0.4s;

          &.expanded {
            transform: translateY(calc(100vh + 60px));
          }

          li {
            margin: 20px 0;
          }
        }

        li {
          display: block;
        }

        a {
          color: white;
          font-size: 24px;
          padding-right: 20px;
          padding-left: 20px;
          font-family: 'Averia Libre';
        }

        a:hover {
          color: #22714c;
        }
      }
    }
  }
}

.outer {
  position: fixed;
  top: 60px;
  width: 100%;
  background: linear-gradient(to left, #4fdf82, #3cc26d, #2fb05c);
  opacity: 1;
  transition: visibility 0.1s, opacity 0.1s linear;
}
.hidden {
  visibility: hidden;
  opacity: 0;
}
.inner {
  position: relative;
  margin: 20px auto;
  width: 100px;
}
</style>
