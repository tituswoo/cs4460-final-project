'use strict';

import Reflux from 'reflux';
import locationActions from '../actions/LocationActions';

let locationStore = Reflux.createStore({
  listenables: [locationActions],
  init: function() {
    let savedLocations = JSON.parse(window.sessionStorage.getItem('locations')) || {};
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
  getLocations: function() {
    return this.locations;
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
  },
  onSwap: function() {
    let temp = this.locations.from;
    this.locations.from = this.locations.to;
    this.locations.to = temp;
    this.trigger(this.locations);
  }
});

export default locationStore;
