<template>
  <figure class="portfolio-item">
    <h3>{{ title }}</h3>
    <a
      target="_blank"
      :href="link"
      :style="`background-image: url('${image}')`"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span class="content" v-html="content" />
    </a>
  </figure>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Title' },
    content: { type: String, default: 'Content`' },
    link: { type: String, default: '#' },
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
  &:not(.codepen) {
    height: 399px;
    border: 1px solid rgb(101, 101, 101);
  }
  &:not(.codepen) > h3 {
    height: 50px;
    width: 100%;
    margin: 0;
    padding: 11px;
    color: white;
    background: #3d3d3e;
    font-family: 'Lato', 'Lucida Grande', 'Lucida Sans Unicode', Tahoma,
      Sans-Serif;
    font-weight: normal;
    font-size: 1.1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
