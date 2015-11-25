'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
let Typeahead = require('react-typeahead').Typeahead;

import CityStore from '../stores/CityStore';
import CityActions from '../actions/CityActions';

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
        onKeyDown={this._onKeyDown.bind(this)}
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
    this._unsubscribe = CityStore.listen(this._onUpdate.bind(this));
    CityActions.getCities();
    // duplicate code of what's in _onUpdate.
    // figure out better way of doing this later when I have time.
    this.setState({
      placeholder: this._getRandomCity(this.state.cities)
    });

    this._cycleThroughRandomPlaceholders();
  }

  _onUpdate(cities) {
    this.setState({
      cities: cities
    });
    this.setState({
      placeholder: this._getRandomCity(this.state.cities)
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    if (this._rndPlaceholderInterval) {
      clearInterval(this._rndPlaceholderInterval);
    }
  }

  _cycleThroughRandomPlaceholders() {
    this._rndPlaceholderInterval = setInterval(() => {
      this.setState({
        placeholder: this._getRandomCity(this.state.cities)
      });
    }, (Math.floor(Math.random() * (6000 - 3000)) + 3000));
  }

  _getRandomCity(cities) {
    if (this.props.showHint && cities.length > 0) {
      var index = Math.floor(Math.random() * (cities.length - 1));
      return this._normalizeQueryName(cities[index]);
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
