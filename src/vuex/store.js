import Vue from 'vue';
import Vuex from 'vuex';

// APP
// import * as getters from './getters';
import mutations from './mutations';
import actions from './actions';

// MODULES
import map from './map/index';
import player from './player/index';

Vue.use(Vuex);

const state = {
  loop: null,
  isPaused: false,
  gravity: 1
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    map,
    player
  },
  strict: process.env.MODE === 'development'
});
