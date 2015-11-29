'use strict';

import Reflux from 'reflux';
import locationStore from '../stores/locationStore';
import cityStore from '../stores/cityStore';
import cityReportActions from '../actions/cityReportActions';
import scales from '../scales';

let cityReportStore = Reflux.createStore({
  listenables: [cityReportActions],
  init: function() {
    this.reports = [];
    this.cityDetails = [];

    this.listenTo(cityStore, (cities) => {
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
        this.reports[cityID] = _generateReport(cityID, indices.indices);
        this.trigger(this.reports);
      }
    }
  },
  get: function(cityID) {
    return this.reports[cityID];
  }
});

// Yeah, I know...
function _generateReport(cityId, indices) {
  let categories = [
    {
      name: 'Cost of Living',
      scale: scales.costOfLiving,
      rating: indices.cpi_index || 0
    },
    {
      name: 'Purchasing Power',
      scale: scales.qualityOfLife,
      rating: indices.purchasing_power_incl_rent_index || 0
    },
    {
      name: 'Safety',
      scale: scales.safety,
      rating: indices.safety_index || 0
    },
    {
      name: 'Health Care',
      scale: scales.healthCare,
      rating: indices.health_care_index || 0
    },
    {
      name: 'Pollution',
      scale: scales.pollutionScale,
      rating: indices.pollution_index || 0
    },
    {
      name: 'Quality of Life',
      scale: scales.qualityOfLife,
      rating: indices.quality_of_life_index || 0
    }
  ];

  console.log('categories for ' + cityId, categories);

  // code duplication everywhere, etc... i know...
  // quick and dirty to get the job done.
  // other deadlines to meet :/
  let keyPrefix = 0;
  return categories.map((category) => {
    keyPrefix += 1;
    if (category.scale.length < 1) {
      return {
        remark: 'No scale defined.',
        icon: 'fa-question-circle',
        color: 'white',
        rating: category.rating,
        key: 0 + keyPrefix
      };
    }

    for (let i = 0; i < category.scale.length; i += 1) {
      if (category.rating >= category.scale[i].from &&
        category.rating <= category.scale[i].to) {
        return {
          remark: category.scale[i].remark + '.',
          icon: category.scale[i].icon,
          className: category.scale[i].className,
          rating: category.rating,
          key: i + keyPrefix
        };
      }
    }

    return {
      remark: 'Unknown',
      icon: 'fa-question-circle',
      className: 'bkg--white',
      rating: category.rating,
      key: 0 + keyPrefix
    };
  });
}

export default cityReportStore;
