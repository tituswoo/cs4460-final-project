'use strict';

import Reflux from 'reflux';
import config from '../config/config';

let CityActions = Reflux.createActions({
  'getCities': {children: ['completed', 'failed']},
  'getDetails': {children: ['completed', 'failed']}
});

CityActions.getCities.listen(function() {
  $.get([
    'http://localhost:3000/api/cities?',
    'api_key=',
    config.numeoKey
  ].join('')).done(this.completed).fail(this.failed);
});

CityActions.getDetails.listen(function(cityId) {
  _getDetailsFor.call(this, cityId, 'city_crime');
  _getDetailsFor.call(this, cityId, 'city_healthcare');
  _getDetailsFor.call(this, cityId, 'city_traffic');
  _getDetailsFor.call(this, cityId, 'indices');
});

function _getDetailsFor(cityId, categoryName) {
  $.get([
    'http://localhost:3000/api/', categoryName, '?',
    'api_key=', config.numeoKey,
    '&city_id=', cityId
  ].join(''))
    .done(this.completed.bind(this, cityId, categoryName))
    .fail(this.fail);
}

export default CityActions;
