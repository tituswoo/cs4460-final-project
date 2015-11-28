'use strict';

import React from 'react';
let CSSTransitionGroup = React.addons.CSSTransitionGroup;

import CityProfile from './CityProfile';
import LoadingDialog from '../components/LoadingDialog';
import ReportCard from '../components/ReportCard';

import CityActions from '../actions/CityActions';
import CityStore from '../stores/CityStore';

import environmentControlActions from '../actions/environmentControlActions';

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
      <div className='flex-row'>
        <CSSTransitionGroup className='city-profile__transition-group'
          transitionName='generic-fade'
          transitionEnterTimeout={500}
          transitionAppear={false}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}>
        <CityProfile
          city={CityStore.get(this.state.locations.from.city_id)}
          cityMeta={this.state.locations.from} />
        </CSSTransitionGroup>
        <div className='city-profile__transition-group swap-btn'
          onClick={locationActions.swap}>
          <i className='fa fa-exchange'></i>
        </div>
        <CSSTransitionGroup className='city-profile__transition-group'
          transitionName='generic-fade'
          transitionEnterTimeout={500}
          transitionAppear={false}
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}>
          <CityProfile
            city={CityStore.get(this.state.locations.to.city_id)}
            cityMeta={this.state.locations.to} />
        </CSSTransitionGroup>
        <ReportCard from={this.state.locations.from} to={this.state.locations.to} />
      </div>
    );
  }

  componentDidMount() {
    environmentControlActions.setControlVisible('startOverButton', true);
    environmentControlActions.blurMap(5);

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
    environmentControlActions.reset();
  }
}

export default Step2;
