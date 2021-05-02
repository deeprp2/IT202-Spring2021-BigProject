<template>
  <div v-if="pageReady">
    <v-container>
      <v-progress-circular
          indeterminate
          color="primary"
      ></v-progress-circular>
    </v-container>
  </div>
  <div v-else>
    <h2>{{selectedStock}} News</h2>
    <v-container bg fill-height grid-list-md>
          <v-card
              class="ma-3"
              v-for="(item, key) in news"
              :key="key"
              max-width="350"
          >
            <v-img
                height="250"
                :src="item['image']"
            ></v-img>

            <v-card-title>
              <div style="font-weight: lighter">{{item["headline"]}}</div></v-card-title>

            <div style="text-align: left" class="pl-2">
              <a :href="item['url']">Link to article</a>
            </div>

            <div style="text-align: left" class="pl-2">
              <v-chip color="primary" text-color="white" class="my-1" small>Source: {{item["source"]}}</v-chip>
            </div>

          </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/store";
import obj from "@/assets/StockMap";

export default {
  name: "News",
  data() {
    return {
      news: [],
      pageReady: false
    }
  },
  mounted() {
    let news = [];
    if (this.selectedStock !== null) {
      axios.get(`https://finnhub.io/api/v1/company-news?symbol=${this.selectedTicker}&from=2021-04-25&token=${process.env.VUE_APP_FINHUB_KEY}`)
      .then((response) => {
        response.data.forEach(item => {
          news.push(item);
        })
      }).then(() => {
        this.news = news;
        this.pageReady = false
      })
    }
  },
  computed: {
    selectedStock() {
      return (store.getters.stockSymbol !== null) ? obj[store.getters.stockSymbol] : null;
    },
    selectedTicker() {
      return store.getters.stockSymbol;
    }
  }
}
</script>

<style scoped>

</style>
