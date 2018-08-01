import Vue from 'vue';
import Vuex from 'vuex';

import playerModule from './player/index';

Vue.use(Vuex);

const state = {
  msg: 'This is Vuex.'
};

export default new Vuex.Store({
  state,
  modules: {
    player: playerModule
  }
});
