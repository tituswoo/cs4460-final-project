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
    return (
      <div>
        <div className='flex-row'>
          <CityProfile
            city={CityStore.get(this.props.location.state.city1.city_id)}
            cityMeta={this.props.location.state.city1} />
          <CityProfile
            city={CityStore.get(this.props.location.state.city2.city_id)}
            cityMeta={this.props.location.state.city2}/>
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
    // yeah this sucks. Refactor later...
    if (CityStore.get(this.props.location.state.city1.city_id) === undefined) {
      CityActions.getDetails(this.props.location.state.city1.city_id);
    }

    if (CityStore.get(this.props.location.state.city2.city_id) === undefined) {
      CityActions.getDetails(this.props.location.state.city2.city_id);
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
}

export default Step2;
