// --PLAYER
import * as mType from './mutation_consts';

export default {
  movePlayer: ({ commit }, e) => {
    let xMove = 0;

    if(e.code === 'KeyA' || e.code === 'ArrowLeft') {
      xMove = -1;
    }
    else if(e.code === 'KeyD' || e.code === 'ArrowRight') {
      xMove = 1;
    }

    commit(mType.MOVE_PLAYER, xMove);
  }
};
