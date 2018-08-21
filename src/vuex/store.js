import Vue from 'vue';
import Vuex from 'vuex';

// APP
// import * as getters from './getters';
import mutations from './mutations';
import actions from './actions';

// MODULES
import map from './map/index';
import player from './player/index';
import msgDisplay from './msg_display/index';
import viewport from './viewport';

Vue.use(Vuex);

const state = {
  loop: null,
  isPaused: false,
  gravity: 3,
  logos: { codepen: 'https://blog.codepen.io/wp-content/uploads/2012/06/Button-Black-Small.png' }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    map,
    viewport,
    player,
    msgDisplay
  },
  strict: process.env.MODE === 'development'
});
