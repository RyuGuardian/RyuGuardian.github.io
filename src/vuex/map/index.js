// --MAP
import * as getters from './getters';
import mutations from './mutations';
import actions from './actions';

const initialState = {
  terrainLines: [
    [
      [0, Math.floor(window.innerHeight * 0.85)],
      [window.innerWidth * 2, Math.floor(window.innerHeight * 0.85)]
    ]
  ],
  mapObjects: {}  // Position of items within named arrays matters: left to right on map
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
};
