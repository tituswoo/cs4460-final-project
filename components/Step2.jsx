'use strict';

import React from 'react';
import CityProfile from './CityProfile';

class Step2 extends React.Component {
  render() {
    let cities = this.props.location.state;
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
}

export default Step2;
