// --MAP
import * as mType from './mutation_consts';

export default {
  addMapObject: ({ commit }, newObject) => {
    commit(mType.ADD_OBJECT, newObject);
  },
  activateObject: ({ dispatch, rootState }, mObject) => {
    if(mObject.data.url === rootState.msgDisplay.displayLink) {
      dispatch('msgDisplay/openLink', null, { root: true });
    }
    else {
      dispatch('msgDisplay/changeMessage', mObject.data, { root: true });
    }
  }
};
