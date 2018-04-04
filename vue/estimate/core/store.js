import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  state: {
    currentObject: null,
    dataLoding: false,
  },
  mutations: {
    setCurrent(state, payload) {
      state.currentObject = payload;
    },
    dataLoading(state, payload) {
      state.dataLoding = payload;
    },
  },
  getters: {
    current(state) {
      return state.currentObject;
    },
    isDataLoading(state) {
      return state.dataLoding;
    }
  }
};

let store = new Vuex.Store(state);

export default store;