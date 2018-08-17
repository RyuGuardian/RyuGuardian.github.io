// --MSGDISPLAY
import * as mType from './mutation_consts';

export default {
  [mType.CHANGE_MESSAGE](state, newMessage) {
    state.message = newMessage;
  },
  [mType.CHANGE_LINK](state, newLink) {
    state.displayLink = newLink;
  },
  [mType.CHANGE_IMAGE](state, newImageResource) {
    state.displayImageUrl = newImageResource;
  },
  [mType.CHANGE_ACTIVE](state, newActive) {
    state.activeUrl = newActive;
  }
};
