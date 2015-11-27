'use strict';

import React from 'react';
import CityProfile from './CityProfile';
import LoadingDialog from '../components/LoadingDialog';

import CityActions from '../actions/CityActions';
import CityStore from '../stores/CityStore';

import locationStore from '../stores/LocationStore';
import locationActions from '../actions/LocationActions';

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: CityStore.getInitialState(),
      locations: locationStore.getInitialState()
    };
  }

  render() {
    if (!CityStore.loaded) {
      return (<LoadingDialog />);
    }
    return (
      <div>
        <div className='flex-row'>
          <CityProfile
            city={CityStore.get(this.state.locations.from.city_id)}
            cityMeta={this.state.locations.from} />
          <CityProfile
            city={CityStore.get(this.state.locations.to.city_id)}
            cityMeta={this.state.locations.to}/>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._unsubscribe = CityStore.listen((cities) => {
      this.setState({cities: cities});
    });

    this._unsubscribeLocationStore = locationStore.listen((locations) => {
      this.setState({locations: locations});
    });

    if (!CityStore.loaded) {
      CityActions.getCities();
    }
    // yeah this sucks. Refactor later...
    if (CityStore.get(this.state.locations.from.city_id) === undefined) {
      CityActions.getDetails(this.state.locations.from.city_id);
    }

    if (CityStore.get(this.state.locations.to.city_id) === undefined) {
      CityActions.getDetails(this.state.locations.to.city_id);
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribeLocationStore();
  }
}

export default Step2;
