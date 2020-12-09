import React from 'react';
import Tilt from "react-tilt";
import Brain from './brain.png';
import "./Logo.css";

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt shadow-2 br2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
				<div className="Tilt-inner pa3">
					<img style={{ paddingTop: '5px', width: '100px'}} alt="logo" src={Brain} />
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;