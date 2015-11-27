'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
let Typeahead = require('react-typeahead').Typeahead;

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
    this.setState({
      placeholder: this._getRandomCity(this.props.cityList)
    });
    this._cycleThroughRandomPlaceholders();
    if (this.props.autoFocus) {
      // Doesn't work for some reason...
      this._typeaheadRef.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      placeholder: this._getRandomCity(nextProps.cityList)
    });
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
      return this._normalizeQueryName(cities[index]);
    } else {
      return '';
    }
  }

  _onKeyDown(e) {
    if (Object.keys(this.state.selectedCity).length > 0) {
      if (e.keyCode != 13 && e.keyCode != 9) {
        // Case for when option is unselected
        // For some reason ENTER key still triggers this,
        // so check keyCode before continuing.
        this.setState({selectedCity: {}});
        this.props.onOptionDeselected();
      }
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
  autoFocus: false,
  onOptionSelected: () => {},
  onOptionDeselected: () => {}
};

CityAutocomplete.propTypes = {
  cityList: React.PropTypes.array,
  showHint: React.PropTypes.bool,
  onOptionSelected: React.PropTypes.func,
  onOptionDeselected: React.PropTypes.func,
  autoFocus: React.PropTypes.bool
};

export default CityAutocomplete;
