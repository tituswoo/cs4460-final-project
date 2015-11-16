'use strict';

import Reflux from 'reflux';
import CompareActions from '../actions/CompareActions';
import numbeoKey from '../numbeoKey';

function _convertLatLngToAddress(pos) {
  return new Promise((resolve, reject) => {
    let geocoder = new google.maps.Geocoder;
    geocoder.geocode({location: pos}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(results[0].formatted_address);
      } else {
        reject('problemo:' + status);
      }
    });
  });
}

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
    console.log('KEY IS:', numbeoKey);
  },
  onCompareLocations: function() {
    console.info('COMPARING LOCATIONS', this.locations.locationA, this.locations.locationB);
    console.log('key:', numbeoKey);
  },
  onUpdateLocation: function(key, value) {
    this.locations[key] = value;
  }
});

export default CompareStore;
