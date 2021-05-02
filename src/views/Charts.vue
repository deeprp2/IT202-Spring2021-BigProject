<template>
  <div>
    <div v-if="!selectedStock">
      <h2 class="py-5">Please select a stock from the search page</h2>
    </div>
    <div v-else>
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
          <v-flex>
            <div style="max-width: 500px; max-height: 500px">
              <h3>Volume Chart</h3>
              <BarChart :chartdata="chartData" v-if="renderCharts"/>
            </div>
          </v-flex>
          <v-flex>
            <div style="max-width: 500px; max-height: 500px">
              <h3>Historical Price Chart</h3>
              <LineChart :chartdata="lineChartData" v-if="renderCharts"/>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>
import store from "@/store/store";
import axios from "axios";
// import Vue from 'vue';
// import obj from "@/assets/StockMap";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";

// https://eodhistoricaldata.com/api/eod/AAPL.US?from=2020-01-05&to=2020-02-10&api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&period=d&fmt=json

export default {
  name: "Charts",
  data() {
    return {
      renderCharts: false,
      priceData: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: []
          }
        ]
      },
      lineChartData: {
        labels: [],
        datasets: [
          {
            fill: false,
            label: 'High',
            borderColor: '#5cff00',
            data: []
          },
          {
            fill: false,
            label: 'Low',
            borderColor: '#f52828',
            data: []
          }
        ]
      }
    }
  },
  components: {
    BarChart,
    LineChart
  },
  computed: {
    selectedStock() {
      return store.getters.stockSymbol
    }
  },
  async mounted() {
    await this.populateStockPriceData();
    this.chartData.datasets[0].data = this.priceData.map(item => item["volume"])
    this.chartData.labels = this.priceData.map(item => item["date"]);
    this.lineChartData.labels = this.chartData.labels
    this.lineChartData.datasets[0].data = this.priceData.map(item => item["high"])
    this.lineChartData.datasets[1].data = this.priceData.map(item => item["low"])
    this.renderCharts = true;
  },
  methods: {
    async populateStockPriceData() {
      await axios.get(`https://eodhistoricaldata.com/api/eod/${this.selectedStock}.US?api_token=${process.env.VUE_APP_EOD_API_KEY}&period=w&fmt=json`)
        .then(async (response) => {
          let data = response.data;
          data.forEach((stock) => {
            this.priceData.push(stock)
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
