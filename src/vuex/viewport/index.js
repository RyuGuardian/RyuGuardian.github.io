// --VIEWPORT
import mutations from './mutations';
import actions from './actions';

const initialState = {
  viewPosition: { x: 0, y: 0 },
  viewDimensions: { width: 800, height: 600 }
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions
};
