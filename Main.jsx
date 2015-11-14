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
      locationA: {
        lat: 0,
        lng: 0
      },
      markers: []
    };
  }

  render() {
    return (
      <div className='Main'>
        <SimpleMap
          markers={this.state.markers}
          defaultZoom={14} />
        <Sidebar locationA={this.state.locationA}/>
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
        locationA: pos,
        markers: this.state.markers.concat([{
          position: pos,
          key: pos.lat + pos.lng,
          defaultAnimation: 2,
          label: 'A'
        }])
      });
    });
  }
}

export default Main;
