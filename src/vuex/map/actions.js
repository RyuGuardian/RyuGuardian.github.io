// --MAP
import * as mType from './mutation_consts';

export default {
  addMapObject: ({ commit }, newObject) => {
    commit(mType.ADD_OBJECT, newObject);
  }
};
