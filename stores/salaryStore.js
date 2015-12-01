'use strict';

import Reflux from 'reflux';
import salaryActions from '../actions/salaryActions';

let salaryStore = Reflux.createStore({
  listenables: [salaryActions],
  init: function() {
    this.salary = 15000;
  },
  getInitialState: function() {
    return this.salary;
  },
  onSetSalary: function(newSalary) {
    this.salary = newSalary;
    this.trigger(this.salary);
  }
});

export default salaryStore;
