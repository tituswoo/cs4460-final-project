'use strict';

import Reflux from 'reflux';
import navControlActions from '../actions/navControlActions';

let navControlStore = Reflux.createStore({
  listenables: [navControlActions],
  init: function() {
    this.controls = {
      startOver: false
    };
  },
  getInitialState: function() {
    return this.controls;
  },
  setControlVisible: function(controlName, visibility) {
    this.controls[controlName] = visibility;
    this.trigger(this.controls);
  },
  onReset: function() {
    this.init();
    this.trigger(this.controls);
  }
});

export default navControlStore;
