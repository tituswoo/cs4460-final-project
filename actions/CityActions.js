'use strict';

import Reflux from 'reflux';
import config from '../config/config';

let CityActions = Reflux.createActions({
  'getCities': {children: ['completed', 'failed']}
});

CityActions.getCities.listen(function() {
  // Right now it will always hit server to get data.
  // Eventually figure out how to check and cache so it only
  // makes request when it has to.
  $.get([
    'http://localhost:3000/api/cities?',
    'api_key=',
    config.numeoKey
  ].join('')).done(this.completed).fail(this.failed);
});

export default CityActions;
