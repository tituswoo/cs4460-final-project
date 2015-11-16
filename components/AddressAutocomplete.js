'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class AddressAutocomplete extends React.Component {
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

    let autocomplete = new google.maps.places.Autocomplete(this._autocomplete);
    console.log(this._autocomplete);

  }
}

export default AddressAutocomplete;
