// --MAP
const initialState = {
  terrainLines: [
    [
      [0, Math.floor(window.innerHeight * 0.75)],
      [window.innerWidth * 2, Math.floor(window.innerHeight * 0.75)]
    ]
  ]
};

export default {
  namespaced: true,
  state: initialState
};
