'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import FullscreenMap from '../components/FullscreenMap';
import FullscreenButton from '../components/FullscreenButton';

import locationStore from '../stores/locationStore';
import locationActions from '../actions/locationActions';

import environmentControlStore from '../stores/environmentControlStore';
import environmentControlActions from '../actions/environmentControlActions';

import fullscreenService from '../services/fullscreenService';

let CSSTransitionGroup = React.addons.CSSTransitionGroup;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: locationStore.getInitialState(),
      controls: environmentControlStore.getInitialState()
    };
  }

  componentDidMount() {
    this._unsubscribe = locationStore.listen((locations) => {
      this.setState({locations: locations});
    });

    this._unsubscribeNavControls = environmentControlStore.listen((controls) => {
      this.setState({controls: controls});
    });

    locationActions.load();
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribeNavControls();
  }

  componentDidUpdate() {
    this._updateMapZoom();
  }

  _updateMapZoom() {
    // This kind of checking is ugly, but for now whatever:
    if (Object.keys(this.state.locations.from).length > 1 &&
        Object.keys(this.state.locations.to).length > 1) {

      let bounds = new google.maps.LatLngBounds();

      bounds.extend(new google.maps.LatLng({
        lat: this.state.locations.from.latitude,
        lng: this.state.locations.from.longitude
      }));
      bounds.extend(new google.maps.LatLng({
        lat: this.state.locations.to.latitude,
        lng: this.state.locations.to.longitude
      }));

      this._map.fitBounds(bounds);
    }
  }

  _gotMapRef(ref) {
    this._map = ref;
  }

  render() {
    return (
      <div className='app'>
        <div className='app__container'>
          { this.state.controls.fullscreenButton &&
            <FullscreenButton />
          }
          { this.state.controls.startOverButton &&
            <div className='big-control__container big-control__container--top'>
              <Link to='step1'>
                <h1 className='big-control__button'>
                  <i className='fa fa-angle-double-up'></i><br />
                  start over
                </h1>
              </Link>
            </div>
          }
          { this.state.controls.exploreButton &&
            <div className='big-control__container big-control__container--bottom'>
              <Link to='explore'>
                <h1 className='big-control__button'>
                  explore<br />
                  <i className='fa fa-angle-double-down'></i>
                </h1>
              </Link>
            </div>
          }
          <FullscreenMap
            controls={this.state.controls}
            locations={this.state.locations}
            gotMapRef={this._gotMapRef.bind(this)}
            />
          <div className='magic-center magic-center--row'>
              {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
