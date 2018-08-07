// --PLAYER
import * as mType from './mutation_consts';

export default {
  movePlayerLeft: ({ commit, state }, e) => {
    if(!e.repeat && state.movementDirection > -1) {
      commit(mType.CHANGE_MOVEMENT_DIRECTION, -1);
    }
  },
  movePlayerRight: ({ commit, state }, e) => {
    if(!e.repeat && state.movementDirection < 1) {
      commit(mType.CHANGE_MOVEMENT_DIRECTION, 1);
    }
  },

  updatePlayerOnGround: ({ commit }, hasCollision) => {
    commit(mType.CHANGE_ON_GROUND_STATUS, hasCollision);
  },

  updatePlayer: ({ commit, state, getters, rootState }, { terrain }) => {
    var positionChange = {
      x: state.movementDirection * state.movementSpeed,
      y: state.fallSpeed + (state.onGround ? 0 : rootState.gravity)
    };

    if(!state.onGround) {
      let highestGroundPoint = getters.getPlayerBottomY;

      // Predict collision (current pos + new pos >= highest point on ground)
      // terrain is an array of lines below Player, determined and passed by App
      let willCollideWithGround = terrain.reduce((status, line) => {
        let highestPoint = line.reduce((pointA, pointB) => {
          return (pointA[1] < pointB[1] ? pointA[1] : pointB[1]);
        });

        if(highestGroundPoint < highestPoint) {
          highestGroundPoint = highestPoint;
        }

        // Calculates for flat-bottomed rectangular Player
        if(status || (getters.getPlayerBottomY + positionChange.y) >= highestGroundPoint) {
          return true;
        }
        else {
          return false;
        }
      }, false);

      if(willCollideWithGround) {
        // Update status and fall speed on collision
        commit(mType.CHANGE_ON_GROUND_STATUS, true);
        commit(mType.CHANGE_FALL_SPEED, -state.fallSpeed);
        positionChange.y = highestGroundPoint - getters.getPlayerBottomY;
      }
      else {
        // Update fall speed, but don't go faster than "terminal velocity"
        if(state.fallSpeed + rootState.gravity >= state.maxFallSpeed) {
          commit(mType.CHANGE_FALL_SPEED, (state.maxFallSpeed - state.fallSpeed));
        }
        else {
          commit(mType.CHANGE_FALL_SPEED, rootState.gravity);
        }
      }
    }

    commit(mType.UPDATE_POSITION, { xChange: positionChange.x, yChange: positionChange.y });
  }
};
