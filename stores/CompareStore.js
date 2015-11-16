'use strict';

import Reflux from 'reflux';
import CompareActions from '../actions/CompareActions';

let CompareStore = Reflux.createStore({
  listenables: [CompareActions],
  init: function() {
    this.locations = {
      locationA: '',
      locationB: ''
    };
  },
  getInitialState: function() {
    return {
      locations: this.locations
    };
  },
  onGetAddress: function() {
    console.log('GETTING THE ADDRESS, PUNK!');
  },
  onCompareLocations: function() {
    console.info('COMPARING LOCATIONS', this.locations.locationA, this.locations.locationB);
  },
  onUpdateLocation: function(key, value) {
    this.locations[key] = value;
  }
});

export default CompareStore;
