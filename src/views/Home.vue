<template>
  <div align="left" class="px-2">
    <h1>Stockify</h1>
    <p>
      A Single-Page App that allows users to search and analyze stocks.
    </p>

    <h2>Instructions</h2>
    <p>
      <v-list>
        <v-list-item v-for="(instruction, key) in instructions" :key="key">
          <v-list-item-content>
            <v-list-item-title class="text-wrap">{{ instruction }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </p>

    <v-btn class="info" to="/search">
      Search
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      instructions: [
        "1. Use the search page to pick a stock",
        "2. Navigate to charts to see charts related to the stock",
        "3. Visit the news page to see news about a stock"
      ]
    }
  }
}
</script>
