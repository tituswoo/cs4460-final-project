import React from 'react'
import GoogleMap from 'react-google-maps'
import SimpleMap from './SimpleMap'
import NavBar from './NavBar';

var state = {
	markers: [{
	  position: {
	    lat: 25.0112183,
	    lng: 121.52067570000001,
	  },
	  key: "Taiwan",
	  defaultAnimation: 2,
	}],
};

class Hello extends React.Component {
	render() {
		return (
			<div>
				<h2>Hello React</h2>
				<NavBar />
				<SimpleMap
					markers={state.markers} />
			</div>
		);
	}

	componentDidMount() {
		console.log('HELLO WOLRD');
	}
}

export default Hello
