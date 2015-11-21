'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class AddressAutocomplete extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type='text'
        ref={(c) => this._autocomplete = c}
        className='input input--full'
        placeholder={this.props.placeholder} />
    );
  }

  componentDidMount() {
    let autocomplete = new google.maps.places.Autocomplete(this._autocomplete, {
      types: this.props.types
    });

    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      this.props.onChange(place);
    });
  }
}

AddressAutocomplete.defaultProps = {
  types: []
};

AddressAutocomplete.propTypes = {
  types: React.PropTypes.array,
  onChange: React.PropTypes.func
};

export default AddressAutocomplete;
