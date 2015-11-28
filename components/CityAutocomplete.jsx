'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
let Typeahead = require('react-typeahead').Typeahead;
import locationService from '../services/locationService';

class CityAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      selectedCity: {}
    };
  }

  render() {
    return (
      <Typeahead
        options={this.props.cityList}
        maxVisible={4}
        value={this.props.value}
        filterOption='city'
        placeholder={this.state.placeholder}
        displayOption={locationService.normalize.bind(this)}
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
    this.setState({
      placeholder: this._getRandomCity(this.props.cityList)
    });
    this._cycleThroughRandomPlaceholders();
    if (this.props.autoFocus) {
      this._typeaheadRef.focus();
    }

    // Exposed component functions:
    this.focus = function() {
      this._typeaheadRef.focus();
    };
  }

  componentWillUnmount() {
    if (this._rndPlaceholderInterval) {
      clearInterval(this._rndPlaceholderInterval);
    }
  }

  _cycleThroughRandomPlaceholders() {
    this._rndPlaceholderInterval = setInterval(() => {
      this.setState({
        placeholder: this._getRandomCity(this.props.cityList)
      });
    }, (Math.floor(Math.random() * (6000 - 3000)) + 3000));
  }

  _getRandomCity(cities) {
    if (this.props.showHint && cities.length > 0) {
      var index = Math.floor(Math.random() * (cities.length - 1));
      return locationService.normalize(cities[index]);
    } else {
      return '';
    }
  }

  _onKeyDown(e) {
    if (e.target.value !== locationService.normalize(this.state.selectedCity)) {
      if (e.target.value === '') {
        this._cycleThroughRandomPlaceholders();
      }
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
}

CityAutocomplete.defaultProps = {
  showHint: false,
  autoFocus: false,
  value: '',
  onOptionSelected: () => {},
  onOptionDeselected: () => {}
};

CityAutocomplete.propTypes = {
  value: React.PropTypes.string,
  cityList: React.PropTypes.array,
  showHint: React.PropTypes.bool,
  onOptionSelected: React.PropTypes.func,
  onOptionDeselected: React.PropTypes.func,
  autoFocus: React.PropTypes.bool
};

export default CityAutocomplete;
