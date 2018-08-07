// --PLAYER
import * as mType from './mutation_consts';

export default {
  [mType.CHANGE_MOVEMENT_DIRECTION](state, x) {
    state.movementDirection += x;
  },

  [mType.CHANGE_ON_GROUND_STATUS](state, hasCollision) {
    state.onGround = hasCollision;
  },

  [mType.CHANGE_FALL_SPEED](state, acceleration) {
    state.fallSpeed += acceleration;
  },

  [mType.UPDATE_POSITION](state, { xChange, yChange }) {
    state.position.x += xChange;
    state.position.y += yChange;
  }
};
