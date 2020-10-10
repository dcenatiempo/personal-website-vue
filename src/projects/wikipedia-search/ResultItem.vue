<template>
  <li class="result-item flex-row">
    <figure class="img-container">
      <img :src="result.imageUrl" />
    </figure>
    <article class="card-text flex-cloumn">
      <a class="title" :href="result.linkUrl" target="_blank">
        {{ result.title }}
      </a>
      <p class="description">
        {{ result.description }}
      </p>
    </article>
  </li>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => ({
        linkUrl: '',
        imageUrl: '',
        title: '',
        description: '',
      }),
    },
  },
};
</script>

<style lang="scss">
.result-item {
  background-color: white;
  margin-top: 15px;
  max-width: 600px;
  box-shadow: 5px 5px 25px #f5f5f5;

  .card-text {
    background-color: #ffffff;
    padding: 10px;
    width: 100%;

    .title {
      font-size: 20px;
    }

    .description {
      color: gray;
    }
  }

  .img-container {
    height: 100px;
    width: 100px;
    margin: 0 10px 0 0;
    padding: 0;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.flex-row {
  display: flex;
  flex-flow: row;
}

.flex-column {
  display: flex;
  flex-flow: column;
}
</style>
