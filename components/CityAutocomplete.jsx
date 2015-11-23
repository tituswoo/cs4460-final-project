'use strict';

import React from 'react';
let Typeahead = require('react-typeahead').Typeahead;

import CityStore from '../stores/CityStore';

class CityAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: CityStore.getInitialState()
    };
  }
  render() {
    return (
      <Typeahead
        options={this.state.cities}
        maxVisible={4}
        filterOption='city'
        displayOption={this._displayOption.bind(this)}
        onOptionSelected={this._onOptionSelected.bind(this)}
        customClasses={{
          input: 'city-autocomplete__input input',
          results: 'city-autocomplete__results',
          listItem: 'city-autocomplete__list-item',
          listAnchor: 'city-autocomplete__list-item-anchor',
          hover: 'city-autocomplete__list-item--hover'
        }}
        className='city-autocomplete'/>
    );
  }

  componentDidMount() {
    this.unsubscribe = CityStore.listen((cities) => {
      this.setState({cities: cities});
    });
  }

  _onOptionSelected(option) {
    console.log('AN OPTION HAS BEEN SELECTED!', option);
  }

  _displayOption(option, index) {
    if (option.city.split(',').length < 2) {
      return option.city + ', ' + option.country;
    }
    return option.city;
  }
}

export default CityAutocomplete;
