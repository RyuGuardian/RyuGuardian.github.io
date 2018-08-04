// --APP
import * as mType from './mutation_consts';

export default {
  startLoop: (context, interval) => {
    context.commit(mType.START_LOOP, interval);
  }
};
