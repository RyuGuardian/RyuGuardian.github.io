// --APP
import * as mType from './mutation_consts';

export default {
  startLoop: (context, interval) => {
    context.commit(mType.START_LOOP, interval);
  },
  pauseLoop: (context) => {
    context.commit(mType.PAUSE_LOOP);
    console.log(context.state.isPaused ? 'PAUSED' : 'RUNNING');
  }
};
