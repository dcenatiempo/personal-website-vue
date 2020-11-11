<template>
  <main class="us-deaths">
    <h2>US Deaths</h2>
    <div ref="chart" />

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
  </main>
</template>

<script>
import * as d3 from 'd3';
// import moment from 'moment';
import data1 from '~/assets/data/us_deaths_2014_2018.json';
import data2 from '~/assets/data/us_deaths_2019_2020.json';
import states from '~/assets/data/us_states.json';

const data = [...data1.data, ...data2.data];
const causes = [
  'All Causes',
  'Natural Causes',
  [data1.meta.view.columns[14].description],
  [data1.meta.view.columns[15].description],
  [data1.meta.view.columns[16].description],
  [data1.meta.view.columns[17].description],
  [data1.meta.view.columns[18].description],
  [data1.meta.view.columns[19].description],
  [data1.meta.view.columns[20].description],
  [data1.meta.view.columns[21].description],
  [data1.meta.view.columns[22].description],
  [data1.meta.view.columns[23].description],
  [data1.meta.view.columns[24].description],
];

// https://observablehq.com/@d3/stacked-bar-chart
// https://data.cdc.gov/NCHS/Weekly-Counts-of-Deaths-by-State-and-Select-Causes/3yf8-kanr/data

export default {
  data: () => ({
    data: data.map(row => ({
      State: row[8],
      Year: row[9],
      Week: row[10],
      'Week Ending Date': row[11],
      'All Causes': +row[12],
      'Natural Causes': +row[13],
      [data1.meta.view.columns[14].description]: +row[14],
      [data1.meta.view.columns[15].description]: +row[15],
      [data1.meta.view.columns[16].description]: +row[16],
      [data1.meta.view.columns[17].description]: +row[17],
      [data1.meta.view.columns[18].description]: +row[18],
      [data1.meta.view.columns[19].description]: +row[19],
      [data1.meta.view.columns[20].description]: +row[20],
      [data1.meta.view.columns[21].description]: +row[21],
      [data1.meta.view.columns[22].description]: +row[22],
      [data1.meta.view.columns[23].description]: +row[23],
      [data1.meta.view.columns[24].description]: +row[24],
    })),
    states,
    selectedStates: [], //Object.keys(states),
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
      const filtered = data.filter(row => selected.includes(row.State));

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
      return d3
        .stack()
        .keys(this.selectedStates)(this.filteredData)
        .map(d => {
          d.forEach(dd => {
            dd.key = d.key;
          });
          return d;
        });
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
      const vm = this;
      const height = 600;
      const width = 1000;
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      console.log(this.series);

      const yDomain = [0, d3.max(vm.series, d => d3.max(d, d => d[1]))];
      const y = d3
        .scaleLinear()
        .domain(yDomain)
        .rangeRound([height - margin.bottom, margin.top]);

      const xDomain = vm.filteredData.map(d => d.weekKey);
      // console.log(xDomain);
      // console.log([margin.left, width - margin.right]);
      const x = d3
        .scaleBand()
        .domain(xDomain)
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const colorRange = d3.quantize(
        d3.interpolateHcl('#f4e153', '#362142'),
        vm.series.length
      );
      const colorDomain = vm.series.map(d => d.key);
      console.log(colorRange);
      const color = d3
        .scaleOrdinal()
        .domain(colorDomain)
        .range(colorRange)
        .unknown('#ccc');

      const formatValue = x => (isNaN(x) ? 'N/A' : x.toLocaleString('en'));
      const yAxis = g =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(null, 's'))
          .call(g => g.selectAll('.domain').remove());

      const xAxis = g =>
        g
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).tickSizeOuter(0))
          .call(g => g.selectAll('.domain').remove());

      const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);

      svg
        .append('g')
        .selectAll('g')
        .data(this.series)
        .join('g')
        .attr('fill', d => color(d.key))
        .selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('x', (d, i) => {
          return x(d.data.weekKey);
        })
        .attr('y', d => y(d[1]))
        .attr('height', d => y(d[0]) - y(d[1]))
        .attr('width', x.bandwidth())
        .append('title')
        .text(d => `${d.data.weekKey} ${d.key} ${formatValue(d.data[d.key])}`);

      svg.append('g').call(xAxis);

      svg.append('g').call(yAxis);
      this.$refs.chart.innerHTML = '';
      this.$refs.chart.appendChild(svg.node());
    },
  },
};
</script>

<style lang="scss">
.us-deaths {
}
</style>
