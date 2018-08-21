// --MSGDISPLAY
import mutations from './mutations';
import actions from './actions';

const initialState = {
  htmlMessage: "<div>"
    + "<h1>Welcome to <em>My Portfolio: The Game</em>!</h1>"
    + "<div><h5>Left: &larr; / A</h5><h5>Jump: SPACE</h5><h5>Right: &rarr; / D</h5></div>"
    + "<p>Hit a block from underneath to display a project.</p>"
    + "<p>A second hit will open it in a <strong>new window/tab</strong>.</p>"
    + "<div class='spacer'></div>"
    + "<p>This game-like site was made using Vue and Vuex.</p>"
    + "<p>(If blocks aren't visible yet, data is being fetched.)</p>"
    + "</div>",
  msgBoxResourceHtml: ""
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions
};
