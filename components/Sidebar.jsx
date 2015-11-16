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
        {this._renderVisualizations()}
    </div>
    );
  }

  _renderVisualizations() {
    let qualityPreposition = this.state.locations.comparisons.quality_of_life > 0 ? 'better' : 'worse';

    if (Object.keys(this.state.locations.comparisons).length < 1) {
      return;
    }

    return (
      <div>
        <h4 className='header__label header__label--no-margin'>Quality of Life</h4>
        <p>
          <strong> {this.state.locations.comparisons.quality_of_life}% </strong>
          {qualityPreposition} than {this.state.locations.locationA.data.name.split(',')[0]}.
        </p>

        <h4 className='header__label'>Safety</h4>
        <p>
          <strong>33%</strong> safer than {this.state.locations.locationA.data.name.split(',')[0]}.
        </p>
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
