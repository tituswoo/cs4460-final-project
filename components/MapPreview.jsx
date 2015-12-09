'use strict';

import React from 'react';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';

class MapPreview extends React.Component {
  render() {
    return (
      <div className='map-preview'
        style={{
          // hide google maps
          height: this.props.height - 24
        }}>
        <div className='map-preview__overlay'>
          <div style={{textAlign: 'center'}}>
            <h1>{this.props.title}</h1>
            <h3 style={{fontStyle: 'italic'}}>{this.props.subtitle}</h3>
            { React.Children.count(this.props.children) > 0 &&
              <div className='map-preview__extra-content'>
                {this.props.children}
              </div>
            }
          </div>
        </div>
        <GoogleMapLoader
          containerElement={
            <div className='map-preview__map' style={{
                height: this.props.height
              }} />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => {this._map = map;}}
              defaultZoom={9}
              options={{
                draggable: false,
                disableDefaultUI: true,
                scrollwheel: false,
                disableDoubleClickZoom: true,
                center: {
                  lat: this.props.latitude,
                  lng: this.props.longitude
                },
                styles: [{
                  elementType: 'labels',
                  stylers: [
                    {visibility: 'off'}
                  ]
                }]
              }}>
            </GoogleMap>
          }>
        </GoogleMapLoader>
      </div>
    );
  }
}

MapPreview.defaultProps = {
  latitude: 0,
  longitude: 0,
  height: 200,
  title: 'Title text in here',
  subtitle: ''
};

MapPreview.propTypes = {
  height: React.PropTypes.number,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  latitude: React.PropTypes.number,
  longitude: React.PropTypes.number
};

export default MapPreview;
