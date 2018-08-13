// --MAP
// Used in getMapWidth
const rightmostXValue = (pointA, pointB) => {
  return Math.max(pointA[0], pointB[0]);
};

export const getMapWidth = (state) => {
  return state.terrainLines.reduce((lineA, lineB) => {
    return Math.max(lineA.reduce(rightmostXValue), lineB.reduce(rightmostXValue));
  }, [[0, 0], [0, 0]]);
};
