// --MAP
import * as mType from './mutation_consts';

export default {
  addMapObject: ({ commit }, newObject) => {
    commit(mType.ADD_OBJECT, newObject);
  },
  activateObject: ({ commit, dispatch, getters, rootState }, mObject) => {
    if(mObject.activated === false && mObject.data.title === rootState.msgDisplay.htmlMessage.replace(/<\/?[\w\d]+>/g, '')) {
      // Activate object if its info is being displayed (trigger click event)
      commit(mType.TOGGLE_OBJECT_ACTIVATION, mObject);
    }
    else {
      // Change displayed text
      dispatch('msgDisplay/changeMessage', mObject.data, { root: true });
      // Deactivate any other activated objects
      getters.getActivatedObjects.forEach((mObj) => {
        commit(mType.TOGGLE_OBJECT_ACTIVATION, mObj);
      });
    }
  }
};
