import * as getters from './getters';
import mutations from './mutations';
import actions from './actions';

const initialState = {
  position: [Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2)],
  direction: 0,
  speed: 5
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
};
