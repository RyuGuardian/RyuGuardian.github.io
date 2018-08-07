// --PLAYER
export const getPlayerLeftX = (state) => state.position.x - Math.floor(state.width / 2);
export const getPlayerRightX = (state) => state.position.x + Math.floor(state.width / 2);
export const getPlayerTopY = (state) => state.position.y - Math.floor(state.height / 2);
export const getPlayerBottomY = (state) => state.position.y + Math.floor(state.height / 2);
