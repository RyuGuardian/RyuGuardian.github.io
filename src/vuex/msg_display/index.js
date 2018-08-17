// --MSGDISPLAY
import mutations from './mutations';
import actions from './actions';

const initialState = {
  message: "Welcome to <em>My Portfolio: The Game</em>!<br />"
    + "Move left: A Key / Left Arrow<br />"
    + "Move right: D Key / Right Arrow<br />"
    + "Jump: Spacebar<br /><br />"
    + "Hit the blocks from underneath.<br />"
    + "One hit displays a project, a second hit will open it in a new tab.",
  displayLink: '',
  displayImageUrl: '',
  activeUrl: ''
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions
};
