<template>
  <figure class="portfolio-item">
    <div class="heading">
      <h3 class="title">{{ title }}</h3>
      <a :href="github" target="_blank">
        <BaseSvg name="github" :size="30" color="white" />
      </a>
    </div>
    <a
      v-if="link.includes('http')"
      :href="link"
      target="_blank"
      :style="`background-image: url('${image}')`"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span class="content" v-html="content" />
    </a>
    <nuxt-link v-else :to="link" :style="`background-image: url('${image}')`">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span class="content" v-html="content" />
    </nuxt-link>
  </figure>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Title' },
    content: { type: String, default: 'Content`' },
    link: { type: String, default: '#' },
    github: { type: String, default: '#' },
    image: { type: String, default: '' },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.portfolio-item {
  margin: 1rem;
  position: relative;
  height: 300px;
  border: 1px solid rgb(101, 101, 101);

  .heading {
    height: 50px;
    width: 100%;
    padding: 0 11px;
    background: #3d3d3e;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      margin: 0;
      font-family: 'Lato', 'Lucida Grande', 'Lucida Sans Unicode', Tahoma,
        Sans-Serif;
      font-weight: normal;
      font-size: 1.1em;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .github-logo {
      margin: 0 20px;
    }
  }

  > a {
    display: block;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: calc(100% - 50px);
  }

  .content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    opacity: 0;
    transition: opacity 0.5s;
    padding: 20px;
    white-space: pre-wrap;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
