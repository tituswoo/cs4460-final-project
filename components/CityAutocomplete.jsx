'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
let Typeahead = require('react-typeahead').Typeahead;

import CityStore from '../stores/CityStore';

class CityAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: CityStore.getInitialState(),
      placeholder: '',
      selectedCity: {}
    };
  }
  render() {
    return (
      <Typeahead
        options={this.state.cities}
        maxVisible={4}
        filterOption='city'
        placeholder={this.state.placeholder}
        displayOption={this._displayOption.bind(this)}
        onOptionSelected={this._onOptionSelected.bind(this)}
        onKeyUp={this._onKeyDown.bind(this)}
        customClasses={{
          input: 'city-autocomplete__input input',
          results: 'city-autocomplete__results',
          listItem: 'city-autocomplete__list-item',
          listAnchor: 'city-autocomplete__list-item-anchor',
          hover: 'city-autocomplete__list-item--hover'
        }}
        className='city-autocomplete'
        ref={(ref) => {this._typeaheadRef = ref;}}/>
    );
  }

  componentDidMount() {
    this.unsubscribe = CityStore.listen((cities) => {
      this.setState({
        cities: cities
      });
      if (this.props.showHint) {
        this._generateRandomPlaceholder();
      }
      this.setState({
        placeholder: this._getRandomCity()
      });
    });
  }

  componentWillUnmount() {
    if (this._rndPlaceholderInterval) {
      clearInterval(this._rndPlaceholderInterval);
    }
  }

  componentWillUpdate() {
    /*if (Object.keys(this.state.selectedCity).length > 0) {
      console.log('change detected');
      if (this.state.optionSelected) {
        this.setState({
          optionSelected: false
        });
        console.log('deleted option');
        this.props.onOptionDeselected();
      }
    }*/
  }

  _generateRandomPlaceholder() {
    this._rndPlaceholderInterval = setInterval(() => {
      this.setState({
        placeholder: this._getRandomCity()
      });
    }, (Math.floor(Math.random() * (5000 - 3000)) + 3000));
  }

  _getRandomCity() {
    if (this.props.showHint) {
      var index = Math.floor(Math.random() * (this.state.cities.length - 1));
      return this._normalizeQueryName(this.state.cities[index]);
    } else {
      return '';
    }
  }

  _onKeyDown(e) {
    if (this.state.selectedCity.country === undefined) {

    } else if (e.keyCode != 13 && e.keyCode != 9) {
      // Case for when option is unselected
      // For some reason ENTER key still triggers this,
      // so check keyCode before continuing.
      this.setState({selectedCity: {}});
      this.props.onOptionDeselected();
    }
  }

  _onOptionSelected(option, e) {
    clearInterval(this._rndPlaceholderInterval);
    this.setState({selectedCity: option});
    if (this.props.onOptionSelected) {
      this.props.onOptionSelected(option);
    }
  }

  _displayOption(option, index) {
    return this._normalizeQueryName(option);
  }

  _normalizeQueryName(option) {
    if (option.city.split(',').length < 2) {
      return option.city + ', ' + option.country;
    } else {
      return option.city;
    }
  }
}

CityAutocomplete.defaultProps = {
  showHint: false,
  onOptionSelected: () => {},
  onOptionDeselected: () => {}
};

CityAutocomplete.propTypes = {
  showHint: React.PropTypes.bool,
  onOptionSelected: React.PropTypes.func,
  onOptionDeselected: React.PropTypes.func
};

export default CityAutocomplete;
