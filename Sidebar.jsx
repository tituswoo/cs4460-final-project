import React from 'react';
import FormDivider from './FormDivider';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    this.updateState();
    return (
      <div className='Sidebar'>
        <input type='text'
          value={this.state.locationA}
          className='input input--full'
          placeholder='Address 1' />
        <FormDivider text='vs'/>
        <input type='text' className='input input--full' placeholder='Address 2' />
        <button className='button button--primary button--full'>COMPARE LOCATIONS</button>
      </div>
    );
  }

  updateState() {
    this.getAddressFromLatLng(this.props.locationA, (result) => {
      this.setState({
        locationA: result
      });
    });
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
}

export default Sidebar;
