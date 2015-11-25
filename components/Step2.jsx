'use strict';

import React from 'react';
import CityProfile from './CityProfile';

import CityStore from '../stores/CityStore';

class Step2 extends React.Component {
  render() {
    let cities = this.props.location.state;
    console.log(this.props.location);
    return (
      <div>
        <h1>Results</h1>
        <div className='flex-row'>
          <CityProfile cityId={cities.city1} />
          <CityProfile cityId={cities.city2} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._unsubscribe = CityStore.listen();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
}

export default Step2;
