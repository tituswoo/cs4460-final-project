'use strict';

import Reflux from 'reflux';
import environmentControlActions from '../actions/environmentControlActions';

let environmentControlStore = Reflux.createStore({
  listenables: [environmentControlActions],
  init: function() {
    this.controls = {
      startOverButton: false,
      fullscreenButton: true,
      mapBlur: 0
    };
  },
  onBlurMap: function(amount) {
    this.controls.mapBlur = amount || 0;
    this.controls.mapBlur += 'px';
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
});

export default environmentControlStore;
