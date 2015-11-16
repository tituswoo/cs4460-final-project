'use strict';

import Reflux from 'reflux';
import NumbeoActions from '../actions/NumbeoActions';
import numbeoApiKey from '../numbeoKey'

let NumbeoStore = Reflux.createStore({
  listenables: [NumbeoActions],
  init: function() {

  },
  getInitialState: function() {
    return {

    };
  },
  getApiKey: function() {
    console.log('getting the API key');
    console.log('key is:, numbeoApiKey');
    return numbeoApiKey;
  }
});
