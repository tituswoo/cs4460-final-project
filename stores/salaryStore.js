'use strict';

import Reflux from 'reflux';
import salaryActions from '../actions/salaryActions';

let salaryStore = Reflux.createStore({
  listenables: [salaryActions],
  init: function() {
    let savedSalary = JSON.parse(window.sessionStorage.getItem('salary'));
    this.salary = savedSalary || 15000;
  },
  getInitialState: function() {
    return this.salary;
  },
  onSetSalary: function(newSalary) {
    this.salary = newSalary;
    window.sessionStorage.setItem('salary', JSON.stringify(this.salary));
    this.trigger(this.salary);
  }
});

export default salaryStore;
