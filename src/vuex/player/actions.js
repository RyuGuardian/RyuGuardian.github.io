// --PLAYER
import * as mType from './mutation_consts';

export default {
  updatePlayer: ({ commit }) => {
    commit(mType.UPDATE_PLAYER);
  },
  movePlayerLeft: ({ commit, state }, e) => {
    if(!e.repeat && state.direction > -1) {
      commit(mType.CHANGE_DIRECTION, -1);
    }
  },
  movePlayerRight: ({ commit, state }, e) => {
    if(!e.repeat && state.direction < 1) {
      commit(mType.CHANGE_DIRECTION, 1);
    }
  }
};
