'use strict';

import Reflux from 'reflux';
import CompareActions from '../actions/CompareActions';
import locationStore from '../stores/LocationStore';
import config from '../config/config.js';

let CompareStore = Reflux.createStore({
  listenables: [CompareActions],
  init: function() {
    this.comparisons = {};
    this.locations = {};

    this.listenTo(locationStore, (locations) => {
      this.locations = locations;
    });
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
    $.when(call1, call2).done(() => {

      let locationA = this.locations.locationA.data;
      let locationB = this.locations.locationB.data;

      let qualityA = locationA.quality_of_life_index;
      let qualityB = locationB.quality_of_life_index;

      let safetyA = locationA.safety_index;
      let safetyB = locationB.safety_index;

      let cpiA = locationA.cpi_index;
      let cpiB = locationB.cpi_index;

      this.comparisons.quality_of_life = _computeIndexComparison(qualityA, qualityB);
      this.comparisons.safety_comparison = _computeIndexComparison(safetyA, safetyB);
      this.comparisons.cost_of_living = _computeIndexComparison(cpiA, cpiB);

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

function _computeIndexComparison(a, b) {
  return ((1 - (a / b)) * 100).toPrecision(3);
}

export default CompareStore;
