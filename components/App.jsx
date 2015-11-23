'use strict';

import React from 'react';
import {Router, Route, IndexRoute, Link} from 'react-router';
import NavBar from './NavBar';
// import Main from './Main';

class App extends React.Component {
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
}

export default App;
