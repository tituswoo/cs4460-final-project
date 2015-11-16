'use strict';

import React from 'react';
import NavBar from './NavBar';
import Main from './Main';

class App extends React.Component {
  render() {
    return (
			<div className='App'>
				<NavBar />
        <Main />
			</div>
		);
  }
}

export default App;
