import React from 'react';
import FormDivider from './FormDivider';
import AddressAutocomplete from './AddressAutocomplete';
import CompareActions from '../actions/CompareActions';
import CompareStore from '../stores/CompareStore';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = CompareStore.getInitialState();
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
          <AddressAutocomplete
            placeholder='Address 2'/>
        <button
          onClick={this._compareLocations.bind(this)}
          className='button button--primary button--full'>COMPARE LOCATIONS</button>
      </div>
    );
  }

  onCompareStoreUpdate(test) {
    console.log('listener fired.', test);

  }

  componentDidMount() {
    this.unsubscribe = CompareStore.listen(this.onCompareStoreUpdate);

    // testing the zillow api here:
    let url = 'http://localhost:3000/webservice/GetRateSummary.htm?zws-id=X1-ZWz1f0n3blazuz_a2eph&output=json';
    $.get(url, (result) => {
      console.info(result);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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
    CompareActions.compareLocations();
  }

  _onChange(key) {
    return (event) => {
      CompareActions.updateLocation(key, event.target.value);
    };
  }
}

export default Sidebar;
