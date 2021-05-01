import Vue from 'vue'
import Vuex from 'vuex'
import idb from '@/utilities/utils';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        exchanges: [],
        stocks: []
    },
    mutations: {
        ADD_EXCHANGES(state, payload) {
            this.state.exchanges = payload;
        }
    },
    actions: {
        async getExchanges(context) {
            context.state.exchanges = [];
            let exchanges = await idb.getExchanges();
            exchanges.forEach(c => {
                context.state.exchanges.push(c);
            });
        },
        async addExchange(context, exchange) {
            await idb.addExchanges(exchange);
        }
    }
})
