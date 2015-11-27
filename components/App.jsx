'use strict';

import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <div className='app__container'>
          <div className='magic-center magic-center--row'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
