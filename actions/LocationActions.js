'use strict';

import Reflux from 'reflux';

let locationActions = Reflux.createActions([
  'getLocation',
  'setLocation',
  'load'
]);

export default locationActions;
