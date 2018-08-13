// --MAP
import * as getters from './getters';
import mutations from './mutations';
import actions from './actions';

const initialState = {
  terrainLines: [
    [
      [0, Math.floor(window.innerHeight * 0.75)],
      [window.innerWidth * 2, Math.floor(window.innerHeight * 0.75)]
    ]
  ],
  mapObjects: {}
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
};
