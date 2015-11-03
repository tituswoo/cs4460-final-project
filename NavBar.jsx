import React from 'react'
import navStyles from './mainStyles'

class NavBar extends React.Component {
	render() {
		return (
			<div>
				<ul>
					<li class="general"><a style={navStyles.a} href="#">General View</a></li>
		 			<li class="detailed"><a href="#">Detailed View</a></li>
				</ul>
			</div>			
		);
	}
}

export default NavBar