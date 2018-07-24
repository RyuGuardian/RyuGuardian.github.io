import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  msg: 'This is Vuex.'
};

const mutations = {
  changeMsg(state, msg) {
    state.msg = msg;
  }
};

export default new Vuex.Store({
  state: state,
  mutations: mutations
});
