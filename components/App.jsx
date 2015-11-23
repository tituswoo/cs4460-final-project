'use strict';

import React from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import NavBar from './NavBar';

import CityStore from '../stores/CityStore';
import CityActions from '../actions/CityActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: CityStore.getInitialState()
    };
  }

  render() {
    return (
      <div className='app'>
        <NavBar />
        <div className='app__container'>
          {this.props.children}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.unsubscribe = CityStore.listen((cities) => {
      this.setState({cities: cities});
    });

    CityActions.getCities();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

export default App;
