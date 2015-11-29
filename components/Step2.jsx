'use strict';

import React from 'react';
let CSSTransitionGroup = React.addons.CSSTransitionGroup;

import CityProfile from './CityProfile';
import LoadingDialog from '../components/LoadingDialog';
import ReportCard from '../components/ReportCard';

import cityActions from '../actions/cityActions';
import cityStore from '../stores/cityStore';

import environmentControlActions from '../actions/environmentControlActions';

import locationStore from '../stores/locationStore';
import locationActions from '../actions/locationActions';

import cityReportStore from '../stores/cityReportStore';
import cityReportActions from '../actions/cityReportActions';

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: cityStore.getInitialState(),
      locations: locationStore.getInitialState(),
      reports: cityReportStore.getInitialState()
    };
  }

  render() {
    let loc = this.state.locations;

    if (!cityStore.loaded ||
        !cityReportStore.get(loc.from.city_id) ||
        !cityReportStore.get(loc.to.city_id)) {
      return (<LoadingDialog />);
    }
    return (
      <div className='flex-row'>
        <CityProfile
          cityReport={cityReportStore.get(this.state.locations.from.city_id)}
          cityMeta={this.state.locations.from} />
        <div className='swap-btn swap-btn--push-right'
          onClick={locationActions.swap}>
          <i className='fa fa-exchange'></i>
        </div>
        <CityProfile
          cityReport={cityReportStore.get(this.state.locations.to.city_id)}
          cityMeta={this.state.locations.to} />
        <ReportCard
          from={this.state.locations.from}
          to={this.state.locations.to}
          fromReport={cityReportStore.get(this.state.locations.from.city_id)}
          toReport={cityReportStore.get(this.state.locations.to.city_id)} />
      </div>
    );
  }

  componentWillUpdate() {
    if (cityStore.loaded) {
      environmentControlActions.setControlVisible('startOverButton', true);
    }
  }

  componentDidMount() {
    environmentControlActions.setControlVisible('exploreButton', true);
    environmentControlActions.blurMap(5);
    environmentControlActions.set('mapSaturation', 0);

    this._unsubscribe = cityStore.listen((cities) => {
      this.setState({cities: cities});
    });

    this._unsubscribeLocationStore = locationStore.listen((locations) => {
      this.setState({locations: locations});
    });

    this._unsubscribeCityReportStore = cityReportStore.listen((reports) => {
      this.setState({reports: reports});
    });

    if (!cityStore.loaded) {
      cityActions.getCities();
    }

    let loc = this.state.locations;

    // This thoroughly disgusts me, but priority is getting it to work:
    if (cityStore.get(loc.from.city_id) === undefined) {
      cityActions.getDetails(loc.from.city_id);
    }

    if (cityStore.get(loc.to.city_id) === undefined) {
      cityActions.getDetails(loc.to.city_id);
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribeLocationStore();
    this._unsubscribeCityReportStore();
    environmentControlActions.reset();
  }
}

export default Step2;
