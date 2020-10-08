<template>
  <main class="wikipedia-search">
    <h1>WikipediA</h1>
    <h2>The Free Encyclopedia Searcher</h2>
    <div class="search-container">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search"
        @keyup.enter="search"
      />
    </div>
    <div class="button-container flex-row">
      <button @click="search">Wikipedia Search</button>
      <button @click="randomSearch">Random Article</button>
    </div>
    <ul class="search-results">
      <ResultItem
        v-for="result in formattedResults"
        :key="result.key"
        :result="result"
      />
    </ul>
  </main>
</template>

<script>
import ResultItem from './ResultItem';

const searchUrl =
  'https://en.wikipedia.org/w/api.php?' +
  'action=query&' +
  'format=json&' +
  'prop=info%7Cextracts%7Cpageimages&' +
  'list=&' +
  'meta=&' +
  'iwurl=1&' +
  'generator=search&' +
  'inprop=url&' +
  'exchars=100&' +
  'exlimit=20&' +
  'exintro=1&' +
  'explaintext=1&' +
  'exsectionformat=plain&' +
  'excontinue=1&' +
  'piprop=name%7Coriginal&' +
  'gsrsearch=';

export default {
  components: { ResultItem },
  data() {
    return {
      searchTerm: '',
      results: [],
    };
  },
  computed: {
    formattedResults() {
      if (!this.results) return [];
      return this.results.map(result => ({
        linkUrl: result.fullurl || result?.canonicalurl || '',
        imageUrl: result.original?.source || '',
        title: result?.title || '',
        description: result?.extract || '',
        key: result.pageid,
      }));
    },
  },
  methods: {
    search() {
      const vm = this;
      // jquery was the easiest way to bypass cors
      // eslint-disable-next-line no-undef
      $.ajax({
        dataType: 'jsonp',
        url: searchUrl + this.searchTerm.split(' ').join('+'),
        success: data => {
          let results = Object.values(data?.query?.pages);
          vm.results = results;
        },
      });
    },
    randomSearch() {
      window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
    },
  },
  head: {
    script: [
      {
        // jquery was the easiest way to bypass cors with jsonp
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
      },
    ],
  },
};
</script>

<style lang="scss">
.wikipedia-search {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Helvetica', sans-serif;
    font-size: 16px;
  }

  h1 {
    font-family: 'Cormorant SC', serif;
    font-size: 38px;
    margin-bottom: 0px;
  }

  h2 {
    font-family: 'Cormorant SC', serif;
    font-size: 14px;
    margin-top: 0px;
  }

  .search-container {
    border-style: solid;
    border-color: gray;
    border-width: 2px;
    padding: 5px;
    max-width: 500px;
    width: 100%;

    input {
      width: 100%;
      opacity: 1;
      padding: 10px;
      border: none;
    }
  }

  .button-container {
    padding: 10px 0;

    button {
      height: 40px;
      margin: 0 10px;
      padding: 0 10px;
      color: grey;
      background-color: #e2e2e2;
      border-radius: 3px;
      border-style: none;
    }
  }

  .search-results {
    padding: 0;
  }

  .flex-row {
    display: flex;
    flex-flow: row;
  }
}
</style>
