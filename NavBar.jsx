import React from 'react'
import navStyles from './mainStyles'

class NavBar extends React.Component {
	render() {
		return (
			<div>
				<ul style={navStyles.ul}>
					<li style={navStyles.li}><a style={navStyles.a} href="#">General View</a></li>
		 			<li style={navStyles.li}><a href="#">Detailed View</a></li>
				</ul>
			</div>			
		);
	}
}

export default NavBar