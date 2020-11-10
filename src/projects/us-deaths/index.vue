<template>
  <main class="us-deaths">
    <h2>US Deaths</h2>
    <BaseCheckbox
      id="select-all"
      :checked="selectedStates.length == 51"
      :indeterminate="selectedStates.length < 51 && selectedStates.length > 0"
      :label="selectedStates.length < 51 ? 'Select All' : 'Deselect All'"
      @change="onChangeSelectAll"
    />
    <BaseMultiCheckboxInput
      id="states"
      v-model="selectedStates"
      :options="stateOptions"
      key-extractor="long"
      label-extractor="long"
      return-type="key"
    />
    <div id="chart" />
  </main>
</template>

<script>
import * as d3 from 'd3';
import moment from 'moment';
import data from '~/assets/data/us_deaths.json';
import states from '~/assets/data/us_states.json';

// https://observablehq.com/@d3/stacked-bar-chart

export default {
  data: () => ({
    data,
    states,
    selectedStates: Object.keys(states),
  }),
  computed: {
    stateOptions() {
      return Object.keys(this.states).map(key => ({
        long: key,
        short: this.states[key],
      }));
    },
  },
  methods: {
    onChangeSelectAll(val) {
      this.selectedStates = val ? Object.keys(states) : [];
    },
  },
};
</script>

<style lang="scss">
.us-deaths {
}
</style>
