// --PLAYER
import Vue from 'vue';

import * as mType from './mutation_consts';

export default {
  [mType.CHANGE_DIRECTION](state, x) {
    state.direction += x;
  },
  [mType.UPDATE_PLAYER](state) {
    Vue.set(state.position, 0, state.position[0] + (state.direction * state.speed));
  }
};
