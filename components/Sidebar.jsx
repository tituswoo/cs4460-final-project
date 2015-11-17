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

    let isCompareButtonDisabled = (function () {
      return false;
    })();

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
          disabled={isCompareButtonDisabled}
          className='button button--primary button--full'>COMPARE LOCATIONS</button>
        {this._renderVisualizations()}
    </div>
    );
  }

  _renderVisualizations() {
    let qualityPreposition = this.state.comparisons.quality_of_life > 0 ? 'better' : 'worse';
    let safetyPreposition = this.state.comparisons.safety_comparison > 0 ? 'safer' : 'sketchier';
    let costPreposition = this.state.comparisons.cost_of_living > 0 ? 'pricier' : 'cheaper';

    if (Object.keys(this.state.comparisons).length < 1) {
      return;
    }

    return (
      <div className='sidebar-visualization-panel'>
        <h4 className='header__label header__label--no-margin'>Cost of Living</h4>
        <p>
          <strong>{Math.abs(this.state.comparisons.cost_of_living)}% {costPreposition} </strong>
          than {this.state.locations.locationA.data.name.split(',')[0]}.
        </p>
        <h4 className='header__label'>Quality of Life</h4>
        <p>
          <strong>{this.state.comparisons.quality_of_life}% {qualityPreposition} </strong>
          than {this.state.locations.locationA.data.name.split(',')[0]}.
        </p>

        <h4 className='header__label'>Safety</h4>
        <p>
          <strong>
            {this.state.comparisons.safety_comparison}% {safetyPreposition} </strong>
           than {this.state.locations.locationA.data.name.split(',')[0]}.
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
