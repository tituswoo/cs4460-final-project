'use strict';

import React from 'react';
import SimpleMap from './SimpleMap';
import Sidebar from './Sidebar';

/**
 * Yes I know this is is a sucky name,
 * but for now getting things done > good looking code.
 */
class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0
      },
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: 'Taiwan',
        defaultAnimation: 2
      }]
    };
  }

  render() {
    return (
      <div className='Main'>
        <SimpleMap
          markers={this.state.markers}
          defaultZoom={14} />
        <Sidebar />
      </div>
    );
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      let pos = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };

      this.setState({
        location: pos,
        markers: this.state.markers.concat([{
          position: pos,
          key: 'TESTING',
          defaultAnimation: 2
        }])
      });
    });
  }
}

export default Main;
