// --VIEWPORT
import * as mType from './mutation_consts';

export default {
  moveViewport: ({ commit, state, rootGetters }, newPosition) => {
    if(newPosition.x < rootGetters['map/getMapLeftAndRight'][0]) {
      newPosition.x = rootGetters['map/getMapLeftAndRight'][0];
    }
    else if(newPosition.x + state.viewDimensions.width > rootGetters['map/getMapLeftAndRight'][1]) {
      newPosition.x = rootGetters['map/getMapLeftAndRight'][1] - state.viewDimensions.width;
    }

    commit(mType.CHANGE_POSITION, newPosition);
  },

  updateViewport: ({ dispatch, state, rootGetters }) => {
    var leftThresholdDiff = Math.round(state.viewDimensions.width * 0.3);
    var leftThreshold = state.viewPosition.x + leftThresholdDiff;
    var rightThresholdDiff = Math.round(state.viewDimensions.width * 0.7);
    var rightThreshold = state.viewPosition.x + rightThresholdDiff;

    if(rootGetters['player/getPlayerLeftX'] < leftThreshold
      && state.viewPosition.x >= rootGetters['map/getMapLeftAndRight'][0]
    ) {
      // move left
      dispatch('moveViewport', { x: rootGetters['player/getPlayerLeftX'] - leftThresholdDiff });
    }
    else if(rootGetters['player/getPlayerRightX'] > rightThreshold
      && (state.viewPosition.x + state.viewDimensions.width) <= rootGetters['map/getMapLeftAndRight'][1]
    ) {
      // move right

      dispatch('moveViewport', { x: rootGetters['player/getPlayerRightX'] - rightThresholdDiff });
    }
  },

  transformViewport: ({ commit }, newDimensions) => {
    commit(mType.CHANGE_DIMENSIONS, newDimensions);
  }
};
