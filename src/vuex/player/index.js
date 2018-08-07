// --PLAYER
import * as getters from './getters';
import mutations from './mutations';
import actions from './actions';

const initialState = {
  width: 100,
  height: 100,
  position: { x: Math.floor(window.innerWidth / 2), y: Math.floor(window.innerHeight / 2) },
  movementDirection: 0,
  movementSpeed: 5,
  onGround: false,
  jumpStrength: 25,
  fallSpeed: 0,
  maxFallSpeed: 15
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
};
