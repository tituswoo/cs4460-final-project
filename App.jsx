import React from 'react';
import GoogleMap from 'react-google-maps';
import SimpleMap from './SimpleMap';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

var state = {
  markers: [{
    position: {
      lat: 25.0112183,
      lng: 121.52067570000001,
    },
    key: 'Taiwan',
    defaultAnimation: 2
	}]
};

class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<NavBar />
				<div className='Main'>
					<SimpleMap
						markers={state.markers} />
					<Sidebar />
				</div>
			</div>
		);
	}

	componentDidMount() {

	}
}

export default App;
