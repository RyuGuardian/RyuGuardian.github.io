// --MSGDISPLAY
import * as mType from './mutation_consts';

export default {
  changeMessage: ({ commit, dispatch }, { title, url, imageUrl }) => {
    if(!imageUrl) {
      imageUrl = '';
    }

    commit(mType.CHANGE_MESSAGE, title);
    commit(mType.CHANGE_LINK, url);
    commit(mType.CHANGE_IMAGE, imageUrl);
  },
  openLink: ({ commit, state }) => {
    commit(mType.CHANGE_ACTIVE, state.displayLink);
  },
  deactivate: ({ commit }) => {
    commit(mType.CHANGE_ACTIVE, '');
  }
};
