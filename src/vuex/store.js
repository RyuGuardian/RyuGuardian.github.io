import Vue from 'vue';
import Vuex from 'vuex';

// APP
import mutations from './mutations';
import actions from './actions';

// PLAYER
import playerModule from './player/index';

Vue.use(Vuex);

const state = {
  msg: 'This is Vuex.',
  loop: null
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    player: playerModule
  }
});
