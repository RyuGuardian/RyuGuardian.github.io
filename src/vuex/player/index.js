import * as getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    position: [Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2)],
    speed: 5
  },
  getters,
  mutations,
  actions
};
