'use strict';

import Reflux from 'reflux';
import CityActions from '../actions/CityActions';
import config from '../config/config';

let CityStore = Reflux.createStore({
  listenables: [CityActions],
  init: function() {
    this.cities = [];
  },
  getInitialState: function() {
    return this.cities;
  },
  onGetCitiesCompleted: function(results) {
    this.cities = results.cities;
    this.trigger(this.cities);
  },
  onGetCitiesFailed: function() {
    console.log('failed to get cities');
  }
});

export default CityStore;
