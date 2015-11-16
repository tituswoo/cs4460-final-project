'use strict';

import Reflux from 'reflux';
import CompareActions from '../actions/CompareActions';
import config from '../config/config.js';

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
      locationA: {
        data: {}
      },
      locationB: {
        data: {}
      }
    };
  },
  getInitialState: function() {
    return {
      locations: this.locations
    };
  },
  onGetAddress: function() {
    console.log('GETTING THE ADDRESS, PUNK!');
    console.log('KEY IS:', config.numeoKey);
  },
  onCompareLocations: function() {
    // console.info('COMPARING LOCATIONS', this.locations.locationA, this.locations.locationB);
    console.log('For A:', this.locations.locationA.locationString);
    $.get('http://localhost:3000/api/indices?api_key=5nng85zgjskdxo&query=' + this.locations.locationA.locationString, (data) => {
      this.locations.locationA.data = data;

      this.trigger(this.locations);
      console.log(this.locations.locationA);
    });

    console.log(this.locations.locationB.locationString);
    $.get('http://localhost:3000/api/indices?api_key=5nng85zgjskdxo&query=' + this.locations.locationB.locationString, (data) => {
      this.locations.locationB.data = data;

      this.trigger(this.locations);
      console.log(this.locations.locationB);
    });
  },
  onUpdateLocation: function(key, value) {
    this.locations[key].locationString = value;
    this.trigger(this.locations);
  }
});

export default CompareStore;
