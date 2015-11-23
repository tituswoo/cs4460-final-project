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
    console.log('giving initial state.');
    return this.cities;
  },
  onGetCities: function() {
    if (this.cities.length < 1) {
      $.get([
        'http://localhost:3000/api/cities?',
        'api_key=',
        config.numeoKey
      ].join('')).done((cities) => {
        this.cities = cities;
        console.log('I GOT THE CITIES!', cities);
        this.trigger(this.cities);
      }).fail((error) => {
        console.error('COULD NOT GET CITIES!');
      });
    }
  }
});

export default CityStore;
