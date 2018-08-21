// --MAP
// Used in getMapWidth
const rightmostXValue = (pointA, pointB) => {
  return Math.max(pointA[0], pointB[0]);
};

const leftmostXValue = (pointA, pointB) => {
  return Math.min(pointA[0], pointB[0]);
};

export const getMapLeftAndRight = (state) => {
  return state.terrainLines.reduce((lineA, lineB) => {
    let start = Math.min(lineA.reduce(leftmostXValue), lineB.reduce(leftmostXValue));
    let end = Math.max(lineA.reduce(rightmostXValue), lineB.reduce(rightmostXValue));

    return [[start, 0], [end, 0]];
  }, [[0, 0], [0, 0]]).reduce((pointA, pointB) => [pointA[0], pointB[0]]);
};

export const getMapWidth = (state, getters) => {
  return getters.getMapLeftAndRight[1] - getters.getMapLeftAndRight[0];
};

export const getActivatedObjects = (state) => {
  return Object.values(state.mapObjects).reduce((reducedArr, typeArr) => {
    return reducedArr.concat(typeArr.filter((mObj) => mObj.activated));
  }, []);
};

export const getObjectsNearPlayer = (state, getters, rootState, rootGetters) => {
  // Query each object array in map for proximity (within 300px left/right) of player
  // (Start a percentage through array and look left and right)
  var objectsNearPlayer = [];

  Object.values(state.mapObjects).forEach((typeArr) => {
    let progress = (rootGetters['player/getPlayerMapProgress'] * typeArr.length).toFixed();

    // Work through arrays until reaching an object past player position by over 300
    let progressIter = progress - 1;
    let currObj = typeArr[progressIter];

    // Look left until reaching an object more than 300 pixels left of player
    while(currObj && rootGetters['player/getPlayerLeftX'] - currObj.position.x < 300) {
      if(Math.abs(rootGetters['player/getPlayerLeftX'] - currObj.position.x) < 300) {
        objectsNearPlayer.push(currObj);
      }

      progressIter--;
      currObj = typeArr[progressIter];
    }

    progressIter = progress;
    currObj = typeArr[progressIter];

    // Look right until reaching an object more than 300 pixels right of player
    while(currObj && rootGetters['player/getPlayerRightX'] - currObj.position.x > -300) {
      if(Math.abs(rootGetters['player/getPlayerRightX'] - currObj.position.x) < 300) {
        objectsNearPlayer.push(currObj);
      }

      progressIter++;
      currObj = typeArr[progressIter];
    }
  });

  return objectsNearPlayer;
};
