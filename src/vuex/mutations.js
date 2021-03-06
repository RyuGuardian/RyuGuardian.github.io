// --APP
import * as mType from './mutation_consts.js';

export default {
  [mType.START_LOOP](state, interval) {
    state.loop = interval;
  },
  [mType.PAUSE_LOOP](state) {
    state.isPaused = !state.isPaused;
  }
};
