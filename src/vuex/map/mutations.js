// --MAP
import Vue from 'vue';

import * as mType from './mutation_consts';

export default {
  [mType.ADD_OBJECT](state, newObject) {
    var type = newObject.type;

    if(!state.mapObjects[type]) {
      Vue.set(state.mapObjects, type, []);
    }

    Vue.set(state.mapObjects[type], state.mapObjects[type].length, newObject.details);
  }
};
