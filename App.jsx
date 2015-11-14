'use strict';

import React from 'react';
import SimpleMap from './SimpleMap';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import Main from './Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: 'Taiwan',
        defaultAnimation: 2
      }]
    };
  }

  render() {
    return (
			<div className='App'>
				<NavBar />
        <Main>
          <SimpleMap
						markers={this.state.markers}
            defaultZoom={14} />
					<Sidebar />
        </Main>
			</div>
		);
  }

	componentDidMount() {

	}
}

export default App;
