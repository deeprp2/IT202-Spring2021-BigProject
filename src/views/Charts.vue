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
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";

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
            label: 'Volume',
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
    this.chartData.datasets[0].data = this.priceData.map((item) => {return parseInt(item["5. volume"])})
    this.chartData.labels = this.priceData.map(item => item["date"])
    this.lineChartData.labels = this.chartData.labels
    this.lineChartData.datasets[0].data = this.priceData.map(item => Math.floor(parseFloat(item["2. high"])))
    this.lineChartData.datasets[1].data = this.priceData.map(item => Math.floor(parseFloat(item["3. low"])))
    this.renderCharts = true;
  },
  methods: {
    async populateStockPriceData() {
      await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.selectedStock}&outputsize=compact&apikey=${process.env.VUE_APP_EOD_API_KEY}`)
        .then(async (response) => {
          let data = response.data["Time Series (Daily)"];

          for (const [key, value] of Object.entries(data)) {
            let obj = {
              "date": key,
              ...value
            }
            this.priceData.push(obj)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
