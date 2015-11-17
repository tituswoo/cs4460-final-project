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
    this.comparisons = {};
  },
  getInitialState: function() {
    return {
      locations: this.locations,
      comparisons: this.comparisons
    };
  },
  onGetAddress: function() {
    console.log('GETTING THE ADDRESS, PUNK!');
    console.log('KEY IS:', config.numeoKey);
  },
  onCompareLocations: function() {
    let call1 = $.get(['http://localhost:3000/api/indices?api_key=5nng85zgjskdxo&query=',
      this.locations.locationA.locationString].join(''), (data) => {
        this.locations.locationA.data = data;
        this.trigger(this.locations);
        console.log(data);
      });

    let call2 = $.get(['http://localhost:3000/api/indices?api_key=5nng85zgjskdxo&query=',
      this.locations.locationB.locationString].join(''), (data) => {
        this.locations.locationB.data = data;
        this.trigger(this.locations);
        console.log(data);
      });

    $.when(call1, call2).done(() => {
      let qualityA = this.locations.locationA.data.quality_of_life_index;
      let qualityB = this.locations.locationB.data.quality_of_life_index;

      let bComparedToA = _computeQualityComparison(qualityA, qualityB);

      this.comparisons.quality_of_life = bComparedToA.toPrecision(3);

      this.locations.locationA.locationString = this.locations.locationA.data.name;
      this.locations.locationB.locationString = this.locations.locationB.data.name;

      this.trigger(this.locations);
    });
  },
  onUpdateLocation: function(key, value) {
    this.locations[key].locationString = value;
    this.trigger(this.locations);
  }
});

function _computeQualityComparison(qualityA, qualityB) {
  return (1 - (qualityA / qualityB)) * 100;
}

export default CompareStore;
