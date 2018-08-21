// --MSGDISPLAY
import * as mType from './mutation_consts';

export default {
  changeMessage: ({ commit, dispatch }, { title, resourceHtml }) => {
    if(title) {
      title = `<h2>${title}</h2>`;
    }

    if(!resourceHtml) {
      resourceHtml = '';
    }

    commit(mType.CHANGE_MESSAGE, title);
    commit(mType.CHANGE_VISUAL, resourceHtml);
  }
};
