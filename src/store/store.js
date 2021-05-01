import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.localStorage,
    })],
    state: {
       StockSymbol: null
    },
    mutations: {
       SET_STOCK_SYMBOL(state, payload) {
           state.StockSymbol = payload;
       }
    },
    getters: {
        stockSymbol: state => {
            return state.StockSymbol;
        }
    }
})
