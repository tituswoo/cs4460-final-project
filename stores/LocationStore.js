'use strict';

import Reflux from 'reflux';
import locationActions from '../actions/LocationActions';

let locationStore = Reflux.createStore({
  listenables: [locationActions],
  init: function() {
    let savedLocations = JSON.parse(window.sessionStorage.getItem('locations'));
    console.info('saved locations', savedLocations);
    this.locations = {
      from: savedLocations.from || {},
      to: savedLocations.to || {},
      current: {
        // default to middle of USA:
        longitude: 36.703660,
        latitude: -100.371094
      }
    };
  },
  loaded: false,
  onLoad: function() {
    navigator.geolocation.getCurrentPosition((position) => {
      let coords = position.coords;
      this.onSetLocation('current', {
        longitude: coords.longitude,
        latitude: coords.latitude
      });
    });
  },
  getInitialState: function() {
    return this.locations;
  },
  onGetLocation: function(loc) {
    return this.locations[loc];
  },
  onSetLocation: function(loc, locationObject) {
    this.locations[loc] = locationObject;
    window.sessionStorage.setItem('locations', JSON.stringify(this.locations));
    this.trigger(this.locations);
  }
});

export default locationStore;
