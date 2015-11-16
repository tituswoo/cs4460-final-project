import React from 'react';
import FormDivider from './FormDivider';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='Sidebar'>
        <input type='text'
          value={this.state.locationA}
          onChange={this._onChange('locationA')}
          className='input input--full'
          placeholder='Address 1' />
        <FormDivider text='vs'/>
          <input type='text'
            value={this.state.locationB}
            onChange={this._onChange('locationB')}
            className='input input--full'
            placeholder='Address 2' />
        <button
          onClick={this._compareLocations.bind(this)}
          className='button button--primary button--full'>COMPARE LOCATIONS</button>
      </div>
    );
  }

  componentWillUpdate() {

  }

  updateState() {
    this.getAddressFromLatLng(this.props.locationA).then((result) => {
      this.setState({locationA: result});
    }).catch((error) => {
      console.warn(error);
    });
  }

  getAddressFromLatLng(pos) {
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder;
      geocoder.geocode({location: pos}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results[0].formatted_address);
        } else {
          reject('problemo:' + status);
        }
      });
    });
  }

  _compareLocations() {
    console.info('Comparing', this.state.locationA, 'with', this.state.locationB);
    alert('Take these two addresses and do shenanigans with it! Hopefully with cool APIs');
  }

  _onChange(key) {
    return (event) => {
      this.setState({[key]: event.target.value});
    };
  }
}

export default Sidebar;
