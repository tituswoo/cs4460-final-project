'use strict';

import Reflux from 'reflux';
import environmentControlActions from '../actions/environmentControlActions';

let environmentControlStore = Reflux.createStore({
  listenables: [environmentControlActions],
  init: function() {
    this.controls = {
      startOverButton: false,
      exploreButton: false,
      fullscreenButton: true,
      mapBlur: 0,
      mapSaturation: 1,
      mapEnabled: false,
      mapShowDetailed: false
    };
  },
  onBlurMap: function(amount) {
    this.controls.mapBlur = amount || 0;
    this.trigger(this.controls);
  },
  onReset: function() {
    this.init();
    this.trigger(this.controls);
  },
  getInitialState: function() {
    return this.controls;
  },
  setControlVisible: function(controlName, visibility) {
    this.controls[controlName] = visibility;
    this.trigger(this.controls);
  },
  onSet: function(key, value) {
    this.controls[key] = value;
    this.trigger(this.controls);
  }
});

export default environmentControlStore;
