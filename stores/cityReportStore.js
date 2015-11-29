'use strict';

import Reflux from 'reflux';
import locationStore from '../stores/LocationStore';
import CityStore from '../stores/CityStore';
import cityReportActions from '../actions/cityReportActions';
import scales from '../scales';

let cityReportStore = Reflux.createStore({
  listenables: [cityReportActions],
  init: function() {
    this.reports = [];
    this.cityDetails = [];

    this.listenTo(CityStore, (cities) => {
      console.info('CITY STORE POPULATED');
      this.cityDetails = cities.details;
      let locs = locationStore.getLocations();
      this.onGetReport(locs.from.city_id);
      this.onGetReport(locs.to.city_id);
    });
  },
  getInitialState: function() {
    return this.reports;
  },
  // just need to get this to work... not saying this is good:
  onGetReport: function(cityID) {
    let report = this.reports[cityID];
    if (report === undefined) {
      let indices = this.cityDetails[cityID];
      if (indices !== undefined) {
        console.log(indices);
        this.reports[cityID] = _generateReport(cityID, indices);
        this.trigger(this.reports);
      }
    }
  },
  get: function(cityID) {
    return this.reports[cityID];
  }
});

function _generateReport(cityId, indices) {
  let report = {};
  console.log('GENERATING REPORT');
  let categories = [
    {
      name: 'Cost of Living',
      scale: scales.costOfLiving,
      rating: indices.cpi_index
    },
    {
      name: 'Purchasing Power',
      scale: scales.qualityOfLife,
      rating: indices.purchasing_power_incl_rent_index
    },
    {
      name: 'Safety',
      scale: scales.safety,
      rating: indices.safety_index
    },
    {
      name: 'Health Care',
      scale: scales.healthCare,
      rating: indices.health_care_index
    },
    {
      name: 'Pollution',
      scale: scales.pollutionScale,
      rating: indices.pollution_index
    },
    {
      name: 'Quality of Life',
      scale: scales.qualityOfLife,
      rating: indices.quality_of_life_index
    }
  ];

  categories.map((category) => {
    
  });
}

export default cityReportStore;
