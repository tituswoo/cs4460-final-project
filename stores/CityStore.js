'use strict';

import Reflux from 'reflux';
import CityActions from '../actions/CityActions';
import config from '../config/config';

let CityStore = Reflux.createStore({
  listenables: [CityActions],
  init: function() {
    this.cities = {
      list: [],
      details: []
    };
  },
  loaded: false,
  get: function(cityId) {
    return this.cities.details[cityId];
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
  },
  onGetDetailsCompleted: function(cityId, categoryName, response) {
    if (this.cities.details[cityId] === undefined) {
      this.cities.details[cityId] = [];
    }
    this.cities.details[cityId][categoryName] = response;
    this.trigger(this.cities);
  },
  onGetDetailsFailed: function(error) {
    console.warn('FAILED TO GET DETAILS', error);
  }
});

export default CityStore;
