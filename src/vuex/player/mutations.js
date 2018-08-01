// --PLAYER
import Vue from 'vue';

import * as mType from './mutation_consts.js';

export default {
  [mType.MOVE_PLAYER](state, xMove) {
    Vue.set(state.position, 0, state.position[0] + (xMove * state.speed));
  }
};
