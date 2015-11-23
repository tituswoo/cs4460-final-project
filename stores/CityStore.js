'use strict';

import Reflux from 'reflux';

let CityStore = Reflux.createStore({
  init: function() {
    this.cities = [];
  },
  getInitialState: function() {
    return this.cities;
  }
});

export default CityStore;
