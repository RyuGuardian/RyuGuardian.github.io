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

  updatePlayerOnGround: ({ commit, dispatch }, hasCollision) => {
    commit(mType.CHANGE_ON_GROUND_STATUS, hasCollision);
    dispatch('updatePlayerFallSpeed');
  },

  updatePlayerFallSpeed: ({ commit, state, rootState }) => {
    var acceleration = rootState.gravity;

    if(state.onGround) {
      acceleration = -state.fallSpeed;
    }
    // ElseIfs limit fallSpeed to "terminal velocity"
    else if(state.fallSpeed === state.maxFallSpeed) {
      acceleration = 0;
    }
    else if(state.fallSpeed + rootState.gravity >= state.maxFallSpeed) {
      acceleration = state.maxFallSpeed - state.fallSpeed;
    }

    commit(mType.CHANGE_FALL_SPEED, acceleration);
  },

  jumpPlayer: ({ commit, dispatch, state }) => {
    if(state.fallSpeed === 0 && state.onGround) {
      commit(mType.CHANGE_FALL_SPEED, -state.jumpStrength);
      dispatch('updatePlayerOnGround', false);
    }
  },

  updatePlayer: ({ commit, dispatch, state, getters, rootState }, { terrain }) => {
    var positionChange = {
      x: state.movementDirection * state.movementSpeed,
      y: state.fallSpeed + (state.onGround ? 0 : rootState.gravity)
    };

    if(!state.onGround) {
      // Update fallSpeed whenever off ground
      dispatch('updatePlayerFallSpeed');

      if(state.fallSpeed >= 0) {
        // Check for ground collision only if falling downward
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
          dispatch('updatePlayerOnGround', true);
          positionChange.y = highestGroundPoint - getters.getPlayerBottomY;
        }
      }
    }

    commit(mType.UPDATE_POSITION, { xChange: positionChange.x, yChange: positionChange.y });
  }
};
