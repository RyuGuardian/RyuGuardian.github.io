// --PLAYER
export const getPlayerLeftX = (state) => state.position.x - Math.floor(state.width / 2);
export const getPlayerRightX = (state) => state.position.x + Math.floor(state.width / 2);
export const getPlayerTopY = (state) => state.position.y - Math.floor(state.height / 2);
export const getPlayerBottomY = (state) => state.position.y + Math.floor(state.height / 2);
export const getPlayerMapProgress = (state, getters, rootState, rootGetters) => {
  // Return player's percentage (as decimal) of progress toward right end of map
  return Number((state.position.x / rootGetters['map/getMapWidth']).toFixed(3));
};
