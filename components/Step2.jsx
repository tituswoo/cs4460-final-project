'use strict';

import React from 'react';
import CityProfile from './CityProfile';

import CityActions from '../actions/CityActions';
import CityStore from '../stores/CityStore';

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: CityStore.getInitialState()
    };
  }

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

  componentDidMount() {
    this._unsubscribe = CityStore.listen((cities) => {
      this.setState({cities: cities});
    });
    if (!CityStore.loaded) {
      CityActions.getCities();
    }
    if (CityStore.get(this.props.location.state.city1) === undefined) {
      CityActions.getDetails(this.props.location.state.city1);
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
}

export default Step2;
