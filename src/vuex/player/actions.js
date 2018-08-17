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

  jumpPlayer: ({ commit, dispatch, state, rootState }) => {
    if(rootState.isPaused === false && state.fallSpeed === 0 && state.onGround) {
      commit(mType.CHANGE_FALL_SPEED, -state.jumpStrength);
      dispatch('updatePlayerOnGround', false);
    }
  },

  // Calculates y-change due to fall speed and possible map collision
  // Returns promise with change in player's position
  detectMapCollision: ({ dispatch, state, getters }, { terrain, delta }) => {
    return new Promise((resolve) => {
      // Check for ground collision only if falling downward (no walls or ceiling for now)
      if(state.fallSpeed >= 0) {
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
          if(status || (getters.getPlayerBottomY + delta.y) >= highestGroundPoint) {
            return true;
          }
          else {
            return false;
          }
        }, false);

        if(willCollideWithGround) {
          // Update status and fall speed on collision
          dispatch('updatePlayerOnGround', true);
          delta.y = highestGroundPoint - getters.getPlayerBottomY;
        }
      }

      resolve(delta);
    });
  },

  // Calculates x-change due to movement speed and possible collision
  // Returns promise with change in player's position
  detectObjectCollision: ({ commit, dispatch, state, getters }, { mObjects, delta }) => {
    return new Promise((resolve) => {
      if(mObjects.length) {
        // Check for object collisions (above and sides)
        // PLAYER ONLY NEEDS TO KNOW IF IT WILL HIT SOMETHING/WHERE TO STOP
        mObjects.forEach((obj) => {
          let objBottom = obj.position.y + (obj.height / 2);
          let objLeft = obj.position.x - (obj.width / 2);
          let objRight = obj.position.x + (obj.width / 2);
          let newPosition = { x: delta.x + state.position.x, y: delta.y + state.position.y };
          let newSides = {
            top: delta.y + getters.getPlayerTopY,
            left: delta.x + getters.getPlayerLeftX,
            right: delta.x + getters.getPlayerRightX
          };

          if(
            ((newPosition.x < objRight && newPosition.x > objLeft)       // Player center will be within obj sides
            || (newSides.right > objLeft && newSides.right < objRight)  // or right will be within obj
            || (newSides.left < objRight && newSides.left > objLeft))    // or left will be within obj

            && newSides.top < objBottom                                // AND player top will be within obj
          ) {
            // Collision detected
            if(getters.getPlayerTopY <= objBottom) {
              // Player is already next to object
              if(delta.x > 0) {
                // If moving right
                delta.x = objLeft - getters.getPlayerRightX;
              }
              else if(delta.x < 0) {
                // If moving left
                delta.x = objRight - getters.getPlayerLeftX;
              }
              // Otherwise, no side movement, no change
            }
            else if((state.position.x >= objLeft && state.position.x <= objRight)
              || getters.getPlayerRightX >= objLeft || getters.getPlayerLeftX <= objRight
            ) {
              // Player is already under object (bottom hit: activate object)
              if(delta.y < 0) {
                delta.y = objBottom - getters.getPlayerTopY;
                commit(mType.CHANGE_FALL_SPEED, -state.fallSpeed);
                dispatch('map/activateObject', obj, { root: true });
              }
            }
          }
        });
      }

      resolve(delta);
    });
  },

  updatePlayer: ({ commit, dispatch, state, rootState }, { terrain, mObjects }) => {
    var delta = {
      x: state.movementDirection * state.movementSpeed,
      y: state.fallSpeed + (state.onGround ? 0 : rootState.gravity)
    };

    if(!state.onGround) {
      // Update fallSpeed whenever off ground
      dispatch('updatePlayerFallSpeed');
    }

    dispatch('detectMapCollision', { terrain, delta }).then((delta) => {
      dispatch('detectObjectCollision', { mObjects, delta }).then((delta) => {
        commit(mType.UPDATE_POSITION, delta);
      });
    });
  }
};
