'use strict';

import Reflux from 'reflux';
import CityActions from '../actions/CityActions';
import config from '../config/config';

let CityStore = Reflux.createStore({
  listenables: [CityActions],
  init: function() {
    this.cities = {
      list: [],
    };
  },
  loaded: false,
  get: function(cityId) {
    return this.cities[cityId];
  },
  getInitialState: function() {
    return this.cities;
  },
  onGetCitiesCompleted: function(results) {
    this.cities.list = results.cities;
    this.loaded = true;
    this.trigger(this.cities);
  },
  onGetCitiesFailed: function() {
    console.log('failed to get cities');
  }
});

export default CityStore;
