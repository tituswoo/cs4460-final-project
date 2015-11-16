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

    let qualityPreposition = this.state.locations.comparisons.quality_of_life > 0 ? 'better' : 'worse';

    return (
      <div className='Sidebar'>
        <input type='text'
          value={this.state.locations.locationA.locationString}
          onChange={this._onChange('locationA')}
          className='input input--full'
          placeholder='Address 1' />
        <FormDivider text='vs'/>
          <input type='text'
            value={this.state.locations.locationB.locationString}
            onChange={this._onChange('locationB')}
            className='input input--full'
            placeholder='Address 2' />
        <button
          onClick={this._compareLocations.bind(this)}
          className='button button--primary button--full'>COMPARE LOCATIONS</button>
        <h4>Quality of Life</h4>
        <p>
          <strong> {this.state.locations.comparisons.quality_of_life}% </strong>
          {qualityPreposition} than locationB.</p>
        <p>{this.state.locations.locationA.data.name}</p>
        <p>{this.state.locations.locationB.data.name}</p>
    </div>
    );
  }

  onCompareStoreUpdate(locations) {
    this.setState({locations: locations});
  }

  componentDidMount() {
    this.unsubscribe = CompareStore.listen(this.onCompareStoreUpdate.bind(this));
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
