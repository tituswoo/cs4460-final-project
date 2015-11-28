'use strict';

import Reflux from 'reflux';

let locationActions = Reflux.createActions([
  'getLocation',
  'setLocation',
  'load',
  'swap'
]);

export default locationActions;
