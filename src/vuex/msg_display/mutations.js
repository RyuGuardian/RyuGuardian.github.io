// --MSGDISPLAY
import * as mType from './mutation_consts';

export default {
  [mType.CHANGE_MESSAGE](state, newHtmlMessage) {
    state.htmlMessage = newHtmlMessage;
  },
  [mType.CHANGE_VISUAL](state, newResourceText) {
    state.msgBoxResourceHtml = newResourceText;
  }
};
