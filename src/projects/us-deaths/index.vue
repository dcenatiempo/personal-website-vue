<template>
  <main class="us-deaths">
    <h2>US Deaths</h2>
    {{ filteredData.length }}
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
import data from '~/assets/data/us_deaths_2014_2018.json';
import states from '~/assets/data/us_states.json';
const causes = [
  'All Causes',
  'Natural Causes',
  [data.meta.view.columns[14].description],
  [data.meta.view.columns[15].description],
  [data.meta.view.columns[16].description],
  [data.meta.view.columns[17].description],
  [data.meta.view.columns[18].description],
  [data.meta.view.columns[19].description],
  [data.meta.view.columns[20].description],
  [data.meta.view.columns[21].description],
  [data.meta.view.columns[22].description],
  [data.meta.view.columns[23].description],
  [data.meta.view.columns[24].description],
];

// https://observablehq.com/@d3/stacked-bar-chart
// https://data.cdc.gov/NCHS/Weekly-Counts-of-Deaths-by-State-and-Select-Causes/3yf8-kanr/data

export default {
  data: () => ({
    data: data.data.map(row => ({
      State: row[8],
      Year: row[9],
      Week: row[10],
      'Week Ending Date': row[11],
      'All Causes': +row[12],
      'Natural Causes': +row[13],
      [data.meta.view.columns[14].description]: +row[14],
      [data.meta.view.columns[15].description]: +row[15],
      [data.meta.view.columns[16].description]: +row[16],
      [data.meta.view.columns[17].description]: +row[17],
      [data.meta.view.columns[18].description]: +row[18],
      [data.meta.view.columns[19].description]: +row[19],
      [data.meta.view.columns[20].description]: +row[20],
      [data.meta.view.columns[21].description]: +row[21],
      [data.meta.view.columns[22].description]: +row[22],
      [data.meta.view.columns[23].description]: +row[23],
      [data.meta.view.columns[24].description]: +row[24],
    })),
    states,
    selectedStates: Object.keys(states),
    causes,
    selectedCauses: ['All Causes'],
  }),
  computed: {
    stateOptions() {
      return Object.keys(this.states).map(key => ({
        long: key,
        short: this.states[key],
      }));
    },
    filteredData() {
      const data = this.data;
      const selected = this.selectedStates;
      // const causes = this.selectedCauses;

      let dates = [];
      const filtered =
        selected.length === this.stateOptions.length
          ? data.filter(row => row.State === 'United States')
          : data.filter(row => selected.includes(row.State));

      const groupedByWeek = filtered.reduce((groupArray, row) => {
        // const index = selectedStates.findIndex(row.State);
        const weekKey = `${row.Year}-${row.Week}`;

        let index = dates.findIndex(item => item === weekKey);

        if (index === -1) {
          dates.push(weekKey);
          groupArray.push({ weekKey });
          index = dates.findIndex(item => item === weekKey);
        }

        groupArray[index][row.State] = row['All Causes'];
        return groupArray;
      }, []);

      return groupedByWeek;
    },
    series() {
      return d3.stack().keys(['weekKey'])(this.filteredData);
    },
  },
  watch: {
    series(val) {
      this.buildChart();
    },
  },
  mounted() {
    this.buildChart();
  },
  methods: {
    onChangeSelectAll(val) {
      this.selectedStates = val ? Object.keys(states) : [];
    },
    buildChart() {
      const height = 600;
      const width = 600;
      const margin = { top: 10, right: 10, bottom: 20, left: 40 };
      console.log(this.filteredData);

      console.log(this.series);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(this.series, d => d3.max(d, d => d['All Causes']))])
        .rangeRound([height - margin.bottom, margin.top]);

      // const x = d3
      //   .scaleBand()
      //   .domain(this.filteredData.map(d => `${d[0].Year}-${d[0].Week}`))
      //   .range([margin.left, width - margin.right])
      //   .padding(0.1);

      // const color = d3
      //   .scaleOrdinal()
      //   .domain(series.map(d => d.State))
      //   .range(d3.schemeSpectral[this.filteredData.length])
      //   .unknown('#ccc');

      // const formatValue = x => (isNaN(x) ? 'N/A' : x.toLocaleString('en'));
      // const yAxis = g =>
      //   g
      //     .attr('transform', `translate(${margin.left},0)`)
      //     .call(d3.axisLeft(y).ticks(null, 's'))
      //     .call(g => g.selectAll('.domain').remove());

      // const xAxis = g =>
      //   g
      //     .attr('transform', `translate(0,${height - margin.bottom})`)
      //     .call(d3.axisBottom(x).tickSizeOuter(0))
      //     .call(g => g.selectAll('.domain').remove());

      // const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);

      // svg
      //   .append('g')
      //   .selectAll('g')
      //   .data(this.series)
      //   .join('g')
      //   .attr('fill', d => color(d.key))
      //   .selectAll('rect')
      //   .data(d => d)
      //   .join('rect')
      //   .attr('x', (d, i) => x(d.data.name))
      //   .attr('y', d => y(d[1]))
      //   .attr('height', d => y(d[0]) - y(d[1]))
      //   .attr('width', x.bandwidth())
      //   .append('title')
      //   .text(d => `${d.data.name} ${d.key} ${formatValue(d.data[d.key])}`);

      // svg.append('g').call(xAxis);

      // svg.append('g').call(yAxis);

      // d3.select('#chart').append(svg.node());
    },
  },
};
</script>

<style lang="scss">
.us-deaths {
}
</style>
