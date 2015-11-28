'use strict';

import Reflux from 'reflux';

let navControlActions = Reflux.createActions([
  'setControlVisible',
  'blurMap',
  'desaturateMap',
  'reset',
  'set'
]);

export default navControlActions;
