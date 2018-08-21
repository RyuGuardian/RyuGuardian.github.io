// --VIEWPORT
import * as mType from './mutation_consts';

export default {
  [mType.CHANGE_POSITION](state, delta) {
    state.viewPosition.x = delta.x ? delta.x : state.viewPosition.x;
    state.viewPosition.y = delta.y ? delta.y : state.viewPosition.y;
  },
  [mType.CHANGE_DIMENSIONS](state, { width, height }) {
    state.viewDimensions.width = width;
    state.viewDimensions.height = height;
  }
};
