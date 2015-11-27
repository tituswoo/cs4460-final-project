'use strict';

import Reflux from 'reflux';
import locationActions from '../actions/LocationActions';

let locationStore = Reflux.createStore({
  listenables: [locationActions],
  init: function() {
    this.locations = {
      from: {},
      to: {},
      current: {
        // default to middle of USA:
        lat: 36.703660,
        lng: -100.371094
      }
    };
  },
  loaded: false,
  onLoad: function() {
    console.log('onLoad()');
    navigator.geolocation.getCurrentPosition((position) => {
      let coords = position.coords;
      this.onSetLocation('current', {
        lat: coords.latitude,
        lng: coords.longitude
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
    console.log('onSetLocation(', loc, ')', locationObject);
    this.locations[loc] = locationObject;
    this.trigger(this.locations);
  }
});

export default locationStore;
