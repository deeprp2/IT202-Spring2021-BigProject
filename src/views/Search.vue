<template>
  <div>
    <v-progress-circular
        v-if="!pageReady"
        indeterminate
        color="primary"
    ></v-progress-circular>
    <div v-else>
      <v-container class="custom-container">
        <h2 class="py-1">Search and select a stock symbol</h2>
        <v-form>
          <v-autocomplete :items="exchanges.map(item => {return item.Name})" v-model="selectedStock">
          </v-autocomplete>
        </v-form>

        <v-btn>
          <div v-if="selectedStock !== null">See Charts For {{this.selectedStock}}</div>
          <div v-else>See charts</div>
        </v-btn>

      </v-container>
    </div>
  </div>
</template>

<script>
import idb from '@/utilities/utils';
import axios from 'axios';
import obj from "@/assets/StockMap";
import store from '@/store/store'

export default {
  name: "Search",
  data() {
    return {
      exchanges: [],
      stocks: [],
      pageReady: false,
      stockMap: [],
      selectedStock: null
    }
  },
  async mounted() {
    this.exchanges = await idb.getExchanges();
    this.pageReady = true;
  },
  async created() {
    this.exchanges = await idb.getExchanges()

    if (this.exchanges.length === 0) {
      console.log("populating db")
      await this.populateDB()
    }
  },
  methods: {
    setSymbol(symbol) {
      store.commit("SET_STOCK_SYMBOL", symbol);
    },
    getStockName(symbol) {
        return obj[symbol]
    },
    async populateDB() {
      await axios.get(`https://finnhub.io/api/v1/index/constituents?symbol=^NDX&token=${process.env.VUE_APP_FINHUB_KEY}`)
          .then(async (response) => {
            let data = response.data.constituents ? response.data.constituents : []
            data.forEach((stock) => {
              let ticker = this.getStockName(stock)

              if (ticker !== undefined) {
                idb.addExchanges({
                  "Symbol": stock,
                  "Name": ticker
                })
              }
            })
      })
    }
  },
  watch: {
    selectedStock (val) {
      this.setSymbol(Object.keys(obj).filter(k => obj[k] === val)[0])
    }
  }
}
</script>

<style>

  .custom-container {
    max-width: 500px;
  }

</style>
