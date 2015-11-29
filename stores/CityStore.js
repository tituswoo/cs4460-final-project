'use strict';

import Reflux from 'reflux';
import CityActions from '../actions/CityActions';
import locationStore from '../stores/locationStore';
import config from '../config/config';

let CityStore = Reflux.createStore({
  listenables: [CityActions],
  init: function() {
    this.cities = {
      list: [],
      details: []
    };
    this.listenTo(locationStore, (locations) => {
      // ugly yeah...
      if (this.get(locations.from.city_id) === undefined) {
        CityActions.getDetails(locations.from.city_id);
      }

      if (this.get(locations.to.city_id) === undefined) {
        CityActions.getDetails(locations.to.city_id);
      }
    });
  },
  loaded: false,
  get: function(cityId) {
    let details = this.cities.details[cityId];
    if (details === undefined) {
      CityActions.getDetails(cityId);
    }
    return details;
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
    console.error('Failed to get cities.');
  },
  onGetDetailsCompleted: function(cityId, categoryName, response) {
    if (this.cities.details[cityId] === undefined) {
      this.cities.details[cityId] = [];
    }
    this.cities.details[cityId][categoryName] = response;
    this.trigger(this.cities);
  },
  onGetDetailsFailed: function(error) {
    console.error('FAILED TO GET DETAILS', error);
  }
});

export default CityStore;
