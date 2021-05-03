<template>
  <v-app v-if="isMobile">
    <v-app-bar app color="purple">
      <v-toolbar-title class="text-break">{{ appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <h2 class="text-break font-weight-medium">{{selectedStock}}</h2>
      <v-spacer></v-spacer>
      <v-menu
          left
          bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
              v-for="(page, key) in pages"
              :key="key"
              @click="event => handleClick(event)"
          >
            <v-list-item-title>
              {{ page["page-title"] }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view>
          <router-link to="/about">about</router-link>
        </router-view>
      </v-container>
    </v-main>

    <v-footer app>
      Current Location: Latitude: {{lat}}, Longitude: {{long}}
    </v-footer>
  </v-app>
  <v-app v-else>
    <v-app-bar app color="purple">

      <v-toolbar-title class="text-break font-weight-medium">{{ appTitle }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <h2 class="text-break font-weight-medium">{{selectedStock}}</h2>
      <v-spacer></v-spacer>

      <router-link v-for="(page, key) in pages" :key="key" :to="page['page-link']" style="text-decoration: none">
        <v-btn class="mx-1" text color="white">
          <span>{{ page["page-title"] || "N/A" }}</span>
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view>
          <router-link to="/">about</router-link>
          <router-link to="/search">search</router-link>
          <router-link to="/charts">charts</router-link>
          <router-link to="/news">news</router-link>
        </router-view>
      </v-container>
    </v-main>

    <v-footer app>
      Current Location: Latitude: {{lat}}, Longitude: {{long}}
    </v-footer>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.text-break {
  color: white;
}
</style>

<script>
import store from "@/store/store";
import obj from "@/assets/StockMap";

export default {
  name: 'App',
  data() {
    return {
      pages: [
        {
          "page-title": "Home",
          "page-link": "/"
        },
        {
          "page-title": "Search",
          "page-link": "/search"
        },
        {
          "page-title": "Charts",
          "page-link": "/charts"
        },
        {
          "page-title": "News",
          "page-link": "/news"
        }
      ],
      appTitle: "Stockify",
      lat: "",
      long: ""
    }
  },
  mounted() {
    this.getLocation()
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    selectedStock() {
      return (store.getters.stockSymbol !== null) ? obj[store.getters.stockSymbol] : ""
    }
  },
  methods: {
    handleClick(e) {
      let name = e.target.outerText;

      let link;

      for (let i = 0; i < this.pages.length; i++) {
        if (this.pages[i]["page-title"] === name) {
          link = this.pages[i]["page-link"]
          break;
        }
      }

      if (name !== this.$route.name)
        this.$router.push({path: link})
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          this.lat = data.coords.latitude;
          this.long = data.coords.longitude;
        });
      }
    }
  }
}
</script>
